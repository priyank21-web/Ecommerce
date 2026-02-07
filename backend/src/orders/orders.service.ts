import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  list(tenantId: string, userId: string) {
    return this.prisma.order.findMany({ where: { tenantId, userId }, include: { items: true } });
  }

  async create(tenantId: string, userId: string, dto: CreateOrderDto) {
    const products = await this.prisma.product.findMany({
      where: { tenantId, id: { in: dto.items.map((item) => item.productId) } },
    });
    const items = dto.items.map((item) => {
      const product = products.find((p: typeof products[number]) => p.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product?.price ?? 0,
      };
    });
    const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    return this.prisma.order.create({
      data: {
        tenantId,
        userId,
        status: 'PENDING',
        totalAmount: total,
        items: { create: items },
      },
      include: { items: true },
    });
  }
}
