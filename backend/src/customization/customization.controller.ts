import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CreateCustomizationDto } from './dto';
import { CustomizationService } from './customization.service';

@Controller('customizations')
export class CustomizationController {
  constructor(private readonly customizationService: CustomizationService) {}

  @Get('outcomes')
  listOutcomes(@Headers('x-tenant-id') tenantId: string) {
    return this.customizationService.listOutcomes(tenantId);
  }

  @Post()
  create(
    @Headers('x-tenant-id') tenantId: string,
    @Headers('x-user-id') userId: string,
    @Body() dto: CreateCustomizationDto,
  ) {
    return this.customizationService.createCustomization(tenantId, userId, dto);
  }
}
