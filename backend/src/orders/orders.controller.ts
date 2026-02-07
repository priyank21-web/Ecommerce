import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CheckoutCartDto, CreateOrderDto } from './dto';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RequestWithUser } from '../common/auth.types';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  list(@Req() req: RequestWithUser) {
    return this.ordersService.list(req.user.tenantId, req.user.sub);
  }

  @Post()
  create(@Req() req: RequestWithUser, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(req.user.tenantId, req.user.sub, dto);
  }

  @Post('checkout')
  checkout(@Req() req: RequestWithUser, @Body() dto: CheckoutCartDto) {
    return this.ordersService.checkoutCart(req.user.tenantId, req.user.sub, dto);
  }
}
