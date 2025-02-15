import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { PgModule } from './database/pg.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [AuthModule, BlogModule,PgModule, WebsocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
