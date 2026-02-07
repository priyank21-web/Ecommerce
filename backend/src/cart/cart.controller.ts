import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RequestWithUser } from '../common/auth.types';
import { AddCartItemDto } from './dto';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req: RequestWithUser) {
    return this.cartService.getActiveCart(req.user.tenantId, req.user.sub);
  }

  @Post('items')
  addItem(@Req() req: RequestWithUser, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(req.user.tenantId, req.user.sub, dto);
  }

  @Delete()
  clear(@Req() req: RequestWithUser) {
    return this.cartService.clear(req.user.tenantId, req.user.sub);
  }
}
