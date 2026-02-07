import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePaymentIntentDto } from './dto';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RequestWithUser } from '../common/auth.types';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('intent')
  createIntent(@Req() req: RequestWithUser, @Body() dto: CreatePaymentIntentDto) {
    return this.paymentsService.createIntent(req.user.tenantId, dto);
  }
}
