import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async onModuleInit() {
    this.redisClient.on('connect', () => console.log('🔌 Conectado a Redis'));
    this.redisClient.on('error', (err) => console.error('❌ Error en Redis:', err));
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
  }

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

  // 🔹 Publicar eventos en Redis (para Pub/Sub)
  async publishEvent(channel: string, message: any): Promise<void> {
    await this.redisClient.publish(channel, JSON.stringify(message));
  }

  // 🔹 Suscribirse a eventos en Redis (para recibir datos en tiempo real)
  async subscribeToEvent(channel: string, callback: (message: any) => void): Promise<void> {
    const subscriber = new Redis(); // Creamos un nuevo cliente solo para escuchar eventos
    await subscriber.subscribe(channel);
    subscriber.on('message', (chan, msg) => {
      if (chan === channel) {
        callback(JSON.parse(msg));
      }
    });
  }
}
