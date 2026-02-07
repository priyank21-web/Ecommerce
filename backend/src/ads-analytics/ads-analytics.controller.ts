import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TrackEventDto } from './dto';
import { AdsAnalyticsService } from './ads-analytics.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RequestWithUser } from '../common/auth.types';
import { Roles } from '../common/roles.decorator';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AdsAnalyticsController {
  constructor(private readonly adsAnalyticsService: AdsAnalyticsService) {}

  @Post('track')
  track(@Req() req: RequestWithUser, @Body() dto: TrackEventDto) {
    return this.adsAnalyticsService.track(req.user.tenantId, dto);
  }

  @Roles('TENANT_ADMIN', 'SUPER_ADMIN')
  @Get('dashboard')
  dashboard(@Req() req: RequestWithUser) {
    return this.adsAnalyticsService.dashboard(req.user.tenantId);
  }
}
