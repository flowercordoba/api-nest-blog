import { Module } from '@nestjs/common';
import { RedisModule } from './redis.module';
import { RealTimeGateway } from 'src/gateway/realtime.gateway';
import { RealTimeService } from 'src/services/realtime.service';


@Module({
  imports: [RedisModule], // 🔹 Importamos Redis para conectarnos
  providers: [RealTimeGateway, RealTimeService],
  exports: [RealTimeService],
})
export class RealTimeModule {}
