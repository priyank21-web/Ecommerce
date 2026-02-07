import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateCustomizationDto } from './dto';
import { CustomizationService } from './customization.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RequestWithUser } from '../common/auth.types';

@Controller('customizations')
@UseGuards(JwtAuthGuard)
export class CustomizationController {
  constructor(private readonly customizationService: CustomizationService) {}

  @Get('outcomes')
  listOutcomes(@Req() req: RequestWithUser) {
    return this.customizationService.listOutcomes(req.user.tenantId);
  }

  @Post()
  create(@Req() req: RequestWithUser, @Body() dto: CreateCustomizationDto) {
    return this.customizationService.createCustomization(req.user.tenantId, req.user.sub, dto);
  }
}
