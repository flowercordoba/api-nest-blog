import { Module } from '@nestjs/common';
import { ChartModule } from './chart/chart.module';
import { RealtimeModule } from './realtime/realtime.module';

@Module({
  imports: [RealtimeModule,ChartModule],
  exports: [RealtimeModule,ChartModule],
})
export class WebsocketModule {}
