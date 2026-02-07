import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  list(@Headers('x-tenant-id') tenantId: string, @Headers('x-user-id') userId: string) {
    return this.ordersService.list(tenantId, userId);
  }

  @Post()
  create(
    @Headers('x-tenant-id') tenantId: string,
    @Headers('x-user-id') userId: string,
    @Body() dto: CreateOrderDto,
  ) {
    return this.ordersService.create(tenantId, userId, dto);
  }
}
