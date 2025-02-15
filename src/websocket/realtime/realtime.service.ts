import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoPrice } from './entity/price.entity';
import { RedisService } from 'src/database/redis.service';

@Injectable()
export class RealtimeService {
    constructor(
        @InjectRepository(CryptoPrice)
        private readonly cryptoPriceRepository: Repository<CryptoPrice>,
        private readonly cacheService: RedisService,
        // private readonly chartsGateway: ChartsGateway, // 🔥 WebSockets para actualizar en tiempo real
      ) {} 
}
