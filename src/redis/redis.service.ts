import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('REDIS_HOST', 'redis'); // Default to 'redis'
    const port = this.configService.get<number>('REDIS_PORT', 6379);

    console.log(`Connecting to Redis at ${host}:${port}`);

    this.redis = new Redis({
      host,
      port,
    });

    this.redis.on('connect', () => console.log('✅ Connected to Redis'));
    this.redis.on('error', (err) => console.error('Redis Error:', err));
  }

  onModuleInit() {
    console.log('RedisService initialized');
  }

  getClient(): Redis {
    return this.redis; // Expose the Redis client
  }

  async onModuleDestroy() {
    await this.redis.quit();
    console.log('🔴 Redis connection closed');
  }

  async setValue(key: string, value: string) {
    await this.redis.set(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return this.redis.get(key);
  }
}
