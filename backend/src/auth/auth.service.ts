import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../common/prisma.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async register(dto: RegisterDto) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug: dto.tenantSlug } });
    if (!tenant) {
      throw new BadRequestException('Tenant not found');
    }
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new BadRequestException('Email already registered');
    }
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        tenantId: tenant.id,
        role: 'CUSTOMER',
      },
    });
    return this.issueTokens(user.id, tenant.id, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const matches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!matches) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.issueTokens(user.id, user.tenantId, user.role);
  }

  async refresh(dto: RefreshTokenDto) {
    try {
      const payload = this.jwt.verify(dto.refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET ?? 'changeme-refresh',
      });
      const tokens = await this.prisma.refreshToken.findMany({
        where: { userId: payload.sub, tenantId: payload.tenantId, revoked: false, expiresAt: { gt: new Date() } },
      });
      const match = await Promise.all(tokens.map((token) => bcrypt.compare(dto.refreshToken, token.token)));
      const hasMatch = match.some(Boolean);
      if (!hasMatch) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return this.issueTokens(payload.sub, payload.tenantId, payload.role);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async revoke(userId: string) {
    await this.prisma.refreshToken.updateMany({ where: { userId }, data: { revoked: true } });
    return { revoked: true };
  }

  private async issueTokens(userId: string, tenantId: string, role: string) {
    const payload = { sub: userId, tenantId, role };
    const accessToken = this.jwt.sign(payload);
    const refreshToken = this.jwt.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET ?? 'changeme-refresh',
      expiresIn: '7d',
    });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const tokenHash = await bcrypt.hash(refreshToken, 12);
    await this.prisma.refreshToken.create({
      data: {
        userId,
        tenantId,
        token: tokenHash,
        expiresAt,
      },
    });
    return { accessToken, refreshToken };
  }
}
