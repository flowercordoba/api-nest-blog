import { Injectable, OnModuleInit } from '@nestjs/common';
import { CacheService } from 'src/shared/modules/redis/cache.service';
import { RedisSubscriberService } from 'src/shared/modules/redis/redis-subscriber.service';
import { ChartsGateway } from './chart.gateway';


@Injectable()
export class ChartsService implements OnModuleInit {
  constructor(
    private readonly cacheService: CacheService, // 🔹 Para obtener datos de Redis
    private readonly redisSubscriberService: RedisSubscriberService, // 🔹 Para recibir eventos de Redis Pub/Sub
    private readonly chartsGateway: ChartsGateway, // 🔹 Para emitir datos en WebSockets
  ) {}

  async onModuleInit() {
    // 🔔 Suscribirse a eventos de Redis y emitirlos por WebSocket
    await this.redisSubscriberService.subscribeToEvent('crypto:updates', (data) => {
      console.log('📡 Recibido desde Redis Pub/Sub:', data);
      this.chartsGateway.sendCryptoUpdate(data.price);
    });
  }

  // 🔹 Obtener el último precio almacenado en Redis
  async getLatestPrice(): Promise<number | null> {
    return await this.cacheService.getLatestPrice();
  }

  // 🔹 Obtener historial de precios desde Redis
  async getPriceHistory(): Promise<number[]> {
    return await this.cacheService.getPriceHistory();
  }
}
