import { Module } from '@nestjs/common';
import { AdsAnalyticsController } from './ads-analytics.controller';
import { AdsAnalyticsService } from './ads-analytics.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [AdsAnalyticsController],
  providers: [AdsAnalyticsService, PrismaService],
})
export class AdsAnalyticsModule {}
