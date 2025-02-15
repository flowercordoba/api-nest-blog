import { Module } from '@nestjs/common';
import { ChartModule } from './chart/chart.module';

@Module({
  imports: [ChartModule],
  exports: [ChartModule],
})
export class WebsocketModule {}
