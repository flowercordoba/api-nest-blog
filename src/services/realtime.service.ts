import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class RealTimeService  {
  constructor(private readonly redisService: RedisService) {}

 
 
}
