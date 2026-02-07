import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateCustomizationDto } from './dto';

@Injectable()
export class CustomizationService {
  constructor(private readonly prisma: PrismaService) {}

  listOutcomes(tenantId: string) {
    return this.prisma.outcome.findMany({ where: { tenantId } });
  }

  async createCustomization(tenantId: string, userId: string, dto: CreateCustomizationDto) {
    const pricing = await this.prisma.dynamicPricingRule.findFirst({
      where: { tenantId, outcomeId: dto.outcomeId },
    });
    const basePrice = pricing?.basePrice ?? 0;
    return this.prisma.customization.create({
      data: {
        tenantId,
        userId,
        outcomeId: dto.outcomeId,
        answers: dto.answers,
        generatedBundle: { items: [] },
        totalPrice: basePrice,
      },
    });
  }
}
