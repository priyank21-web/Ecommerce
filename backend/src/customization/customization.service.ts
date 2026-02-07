import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateCustomizationDto } from './dto';

@Injectable()
export class CustomizationService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly promptTemplate =
    'You are a bundle generator. Based on the outcome and answers, return a JSON object with items.';

  listOutcomes(tenantId: string) {
    return this.prisma.outcome.findMany({ where: { tenantId } });
  }

  async createCustomization(tenantId: string, userId: string, dto: CreateCustomizationDto) {
    const pricing = await this.prisma.dynamicPricingRule.findFirst({
      where: { tenantId, outcomeId: dto.outcomeId },
    });
    const basePrice = pricing?.basePrice ?? 0;
    const bundle = await this.generateBundle(dto.answers);
    return this.prisma.customization.create({
      data: {
        tenantId,
        userId,
        outcomeId: dto.outcomeId,
        answers: dto.answers,
        generatedBundle: bundle,
        totalPrice: basePrice,
      },
    });
  }

  private async generateBundle(answers: Record<string, unknown>) {
    if (!process.env.AI_API_KEY) {
      return { items: [], source: 'mock', prompt: this.promptTemplate, answers };
    }
    return { items: [], source: 'ai', prompt: this.promptTemplate, answers };
  }
}
