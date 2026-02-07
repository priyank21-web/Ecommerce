import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { AddCartItemDto } from './dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getActiveCart(tenantId: string, userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: { tenantId, userId, status: 'ACTIVE' },
      include: { items: true },
    });
    if (cart) {
      return cart;
    }
    return this.prisma.cart.create({
      data: { tenantId, userId, status: 'ACTIVE' },
      include: { items: true },
    });
  }

  async addItem(tenantId: string, userId: string, dto: AddCartItemDto) {
    const cart = await this.getActiveCart(tenantId, userId);
    const existing = cart.items.find((item) => item.productId === dto.productId);
    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + dto.quantity },
      });
    }
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
      },
    });
  }

  async clear(tenantId: string, userId: string) {
    const cart = await this.prisma.cart.findFirst({ where: { tenantId, userId, status: 'ACTIVE' } });
    if (!cart) {
      return { cleared: true };
    }
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return { cleared: true };
  }
}
