import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  list(tenantId: string) {
    return this.prisma.product.findMany({ where: { tenantId } });
  }

  create(tenantId: string, dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        tenantId,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        tags: dto.tags ?? [],
      },
    });
  }
}
