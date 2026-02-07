import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RequestWithUser } from '../common/auth.types';
import { Roles } from '../common/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  list(@Req() req: RequestWithUser) {
    return this.productsService.list(req.user.tenantId);
  }

  @Roles('TENANT_ADMIN', 'SUPER_ADMIN')
  @Post()
  create(@Req() req: RequestWithUser, @Body() dto: CreateProductDto) {
    return this.productsService.create(req.user.tenantId, dto);
  }
}
