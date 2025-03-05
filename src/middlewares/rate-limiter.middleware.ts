import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private rateLimiter: RateLimiterRedis;

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this.rateLimiter = new RateLimiterRedis({
      storeClient: this.redisService.getClient(),
      keyPrefix: 'rate-limiter',
      points: this.configService.get('RATE_LIMIT_MAX'),
      duration: this.configService.get('RATE_LIMIT_DURATION'),
      blockDuration: 60,
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const clientKey = Array.isArray(req.headers['x-forwarded-for'])
        ? req.headers['x-forwarded-for'][0] // Take the first IP from the array
        : req.headers['x-forwarded-for'] || req.ip || 'anonymous';

      await this.rateLimiter.consume(clientKey);
      next();
    } catch (rejRes) {
      res.status(429).json({
        message: 'Too many requests. Try again later.',
        retryAfter: Math.ceil(rejRes.msBeforeNext / 1000),
      });
    }
  }
}
