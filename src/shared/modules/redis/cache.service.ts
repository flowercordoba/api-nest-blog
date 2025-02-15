import { Inject, Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis.Redis) {}

  // 🔹 Guardar el último precio en Redis
  async saveLatestPrice(price: number): Promise<void> {
    await this.redisClient.set('crypto:latest', price.toString());
  }

  // 🔹 Obtener el último precio almacenado en Redis
  async getLatestPrice(): Promise<number | null> {
    const price = await this.redisClient.get('crypto:latest');
    return price ? parseFloat(price) : null;
  }

  // 🔹 Guardar el precio en la lista de historial en Redis
  async savePriceHistory(price: number): Promise<void> {
    await this.redisClient.lpush('crypto:history', price.toString());
    await this.redisClient.ltrim('crypto:history', 0, 99); // 🔥 Mantiene solo los últimos 100 valores
  }

  // 🔹 Obtener los últimos 100 precios guardados en Redis
  async getPriceHistory(): Promise<number[]> {
    const prices = await this.redisClient.lrange('crypto:history', 0, 99);
    return prices.map((price) => parseFloat(price));
  }
}
