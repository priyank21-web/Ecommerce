import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  tenants() {
    return this.prisma.tenant.findMany();
  }

  orders(tenantId: string) {
    return this.prisma.order.findMany({ where: { tenantId }, include: { items: true } });
  }

  campaigns(tenantId: string) {
    return this.prisma.campaign.findMany({ where: { tenantId }, include: { ads: true } });
  }
}
