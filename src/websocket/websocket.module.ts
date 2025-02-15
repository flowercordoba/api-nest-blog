import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { RealtimeModule } from './realtime/realtime.module';

@Module({
  imports: [RealtimeModule],
  exports: [MessagesModule],
})
export class WebsocketModule {}
