import { Body, Controller, Headers, Post } from '@nestjs/common';
import { CreatePaymentIntentDto } from './dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('intent')
  createIntent(@Headers('x-tenant-id') tenantId: string, @Body() dto: CreatePaymentIntentDto) {
    return this.paymentsService.createIntent(tenantId, dto);
  }
}
