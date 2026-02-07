import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../common/prisma.service';
import { CreatePaymentIntentDto } from './dto';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(private readonly prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
      apiVersion: '2023-10-16',
    });
  }

  async createIntent(tenantId: string, dto: CreatePaymentIntentDto) {
    const order = await this.prisma.order.findFirst({ where: { tenantId, id: dto.orderId } });
    if (!order) {
      return { error: 'Order not found' };
    }
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100),
      currency: 'usd',
      metadata: { orderId: order.id, tenantId },
    });
    await this.prisma.payment.create({
      data: {
        tenantId,
        orderId: order.id,
        provider: 'STRIPE',
        providerReference: intent.id,
        amount: order.totalAmount,
        status: 'PENDING',
      },
    });
    return { clientSecret: intent.client_secret };
  }
}
