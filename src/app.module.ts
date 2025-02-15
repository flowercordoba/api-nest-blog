import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { PgModule } from './database/pg.module';
import { RedisModule } from './database/redis.module';
import { RealtimeModule } from './websocket/realtime/realtime.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    AuthModule,
    BlogModule,
    PgModule,
    RedisModule,
    WebsocketModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
