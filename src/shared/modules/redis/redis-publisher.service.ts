import { Inject, Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisPublisherService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis.Redis) {}

  // 🔹 Publicar un mensaje en un canal de Redis
  async publishEvent(channel: string, message: any): Promise<void> {
    console.log(`📡 Publicando en ${channel}:`, message);
    await this.redisClient.publish(channel, JSON.stringify(message));
  }
}
