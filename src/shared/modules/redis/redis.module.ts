import { Module, Global, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { envs } from '../../../envs';
import { RedisService } from 'src/shared/modules/redis/redis.service';
import { RedisSubscriberService } from './redis-subscriber.service';
import { RedisPublisherService } from './redis-publisher.service';

const logger: Logger = new Logger('RedisModule');

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const client = new Redis({
          host: envs.REDIS_HOST,
          port: envs.REDIS_PORT,
          password: envs.REDIS_PASSWORD?.trim()
            ? envs.REDIS_PASSWORD
            : undefined,
          db: Number(envs.REDIS_DB) || 0,
        });

        // Mensaje cuando Redis se conecta
        client.on('connect', () => {
          logger.log('✅ Redis Connected');
        });

        // Manejo de errores
        client.on('error', (err) => {
          logger.error(`❌ Redis Error: ${err.message}`);
        });

        return client;
      },
    },
    RedisService,
    RedisSubscriberService,
    RedisPublisherService,
  ],
  exports: [
    'REDIS_CLIENT',
    RedisService,
    RedisSubscriberService,
    RedisPublisherService,
  ],
})
export class RedisModule {}
