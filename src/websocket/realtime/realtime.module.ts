import { Module } from '@nestjs/common';
import { RealtimeService } from './realtime.service';
import { RedisModule } from 'src/shared/modules/redis/redis.module';
import { RealTimeGateway } from './realtime.gateway';

@Module({
  providers: [RealTimeGateway, RealtimeService],
  imports:[RedisModule],
  exports:[RealTimeGateway, RealtimeService]
})
export class RealtimeModule {}
