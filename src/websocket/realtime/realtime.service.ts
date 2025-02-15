import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoPrice } from './entity/price.entity';
import { CacheService } from 'src/shared/modules/redis/cache.service';
import { RedisPublisherService } from 'src/shared/modules/redis/redis-publisher.service';
import { ChartsGateway } from '../chart/chart.gateway';

@Injectable()
export class RealtimeService {
  constructor(
    @InjectRepository(CryptoPrice)
    private readonly cryptoPriceRepository: Repository<CryptoPrice>,
    private readonly cacheService: CacheService,
    private readonly chartsGateway: ChartsGateway,
    private readonly redisPublisherService: RedisPublisherService,
  ) {}

  async savePrice(price: number): Promise<CryptoPrice> {
    console.log(`💾 Guardando precio en PG y Redis: ${price}`);

    // 1️⃣ Guardar en PostgreSQL
    const newPrice = this.cryptoPriceRepository.create({ price });
    const savedPrice = await this.cryptoPriceRepository.save(newPrice);

    // 2️⃣ Guardar en Redis
    await this.cacheService.saveLatestPrice(price);
    await this.cacheService.savePriceHistory(price);

    // 3️⃣ Emitir WebSocket
    this.chartsGateway.sendCryptoUpdate(price);

    // 4️⃣ Publicar en Redis Pub/Sub
    await this.redisPublisherService.publishEvent('crypto:updates', { price });

    console.log(`✅ Precio guardado y transmitido: ${price}`);
    return savedPrice;
  }

}
