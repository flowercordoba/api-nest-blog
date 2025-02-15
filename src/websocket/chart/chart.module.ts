import { Module } from '@nestjs/common';
import { ChartsService } from './chart.service';
import { ChartsGateway } from './chart.gateway';
import { RedisModule } from 'src/shared/modules/redis/redis.module';

@Module({
  providers: [ChartsGateway, ChartsService,RedisModule],
})
export class ChartModule {}
