import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = request.headers['x-forwarded-for'] || request.ip || 'unknown';
    const key = `rate:${ip}`;
    const limit = 120;
    const ttl = 60;
    try {
      const current = await this.redis.incr(key);
      if (current === 1) {
        await this.redis.expire(key, ttl);
      }
      return current <= limit;
    } catch {
      return true;
    }
  }
}
