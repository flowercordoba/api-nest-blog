import { Injectable, Logger } from '@nestjs/common';
import { RealtimeService } from 'src/websocket/realtime/realtime.service';

@Injectable()
export class PgService {
  private readonly logger = new Logger('PgService');

  constructor(private readonly realtimeService: RealtimeService) {}

//   async savePrice(price: number): Promise<void> {
//     await this.realtimeService.savePrice(price);
//     this.logger.log(`📊 Guardado en PostgreSQL: $${price}`);
//   }

//   async getLastPrices(limit: number = 100) {
//     return this.realtimeService.getLastPrices(limit);
//   }
}
