import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { TrackEventDto } from './dto';
import { AdsAnalyticsService } from './ads-analytics.service';

@Controller('analytics')
export class AdsAnalyticsController {
  constructor(private readonly adsAnalyticsService: AdsAnalyticsService) {}

  @Post('track')
  track(@Headers('x-tenant-id') tenantId: string, @Body() dto: TrackEventDto) {
    return this.adsAnalyticsService.track(tenantId, dto);
  }

  @Get('dashboard')
  dashboard(@Headers('x-tenant-id') tenantId: string) {
    return this.adsAnalyticsService.dashboard(tenantId);
  }
}
