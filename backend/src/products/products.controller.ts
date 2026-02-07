import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CreateProductDto } from './dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  list(@Headers('x-tenant-id') tenantId: string) {
    return this.productsService.list(tenantId);
  }

  @Post()
  create(@Headers('x-tenant-id') tenantId: string, @Body() dto: CreateProductDto) {
    return this.productsService.create(tenantId, dto);
  }
}
