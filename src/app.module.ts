import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { PgModule } from './shared/modules/pg/pg.module';
import { RedisModule } from './shared/modules/redis/redis.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    AuthModule,
    BlogModule,
    PgModule,
    RedisModule,
    WebsocketModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
