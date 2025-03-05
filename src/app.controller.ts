import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { RateLimiterMiddleware } from './middlewares/rate-limiter.middleware';

@Controller()
@UseInterceptors(RateLimiterMiddleware)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
