import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CheckoutCartDto, CreateOrderDto } from './dto';

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
      const product = products.find((p) => p.id === item.productId);
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

  async checkoutCart(tenantId: string, userId: string, dto: CheckoutCartDto) {
    const cart = await this.prisma.cart.findFirst({
      where: { id: dto.cartId, tenantId, userId, status: 'ACTIVE' },
      include: { items: true },
    });
    if (!cart) {
      return { error: 'Cart not found' };
    }
    const productIds = cart.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({ where: { tenantId, id: { in: productIds } } });
    const items = cart.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return { productId: item.productId, quantity: item.quantity, unitPrice: product?.price ?? 0 };
    });
    const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const order = await this.prisma.order.create({
      data: { tenantId, userId, status: 'PENDING', totalAmount: total, items: { create: items } },
      include: { items: true },
    });
    await this.prisma.cart.update({ where: { id: cart.id }, data: { status: 'CHECKED_OUT' } });
    return order;
  }
}
