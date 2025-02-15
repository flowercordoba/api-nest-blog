import { Module } from '@nestjs/common';
import { RealtimeService } from './realtime.service';
import { RealtimeGateway } from './realtime.gateway';
import { RedisModule } from 'src/shared/modules/redis/redis.module';

@Module({
  providers: [RealtimeGateway, RealtimeService],
  imports:[RedisModule]
})
export class RealtimeModule {}
