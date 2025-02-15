import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { PgModule } from './database/pg.module';
import { WebsocketModule } from './websocket/websocket.module';
import { RealTimeModule } from './database/realtime.module';
import { RedisModule } from './database/redis.module';

@Module({
  imports: [
    AuthModule,
    BlogModule,
    PgModule,
    WebsocketModule,
    RedisModule,
    RealTimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
