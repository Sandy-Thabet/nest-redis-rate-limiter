import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { RateLimiterMiddleware } from './middlewares/rate-limiter.middleware';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' }), RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimiterMiddleware).forRoutes('*');
  }
}
