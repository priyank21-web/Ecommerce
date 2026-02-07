import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { TrackEventDto } from './dto';

@Injectable()
export class AdsAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  track(tenantId: string, dto: TrackEventDto) {
    return this.prisma.analyticsEvent.create({
      data: {
        tenantId,
        type: dto.type,
        payload: dto.payload,
      },
    });
  }

  dashboard(tenantId: string) {
    return this.prisma.analyticsEvent.findMany({ where: { tenantId }, take: 50, orderBy: { createdAt: 'desc' } });
  }
}
