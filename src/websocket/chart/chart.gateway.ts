import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChartsService } from './chart.service';

@WebSocketGateway({ cors: true })
export class ChartsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss!: Server;

  constructor(private readonly chartsService: ChartsService) {}

  handleConnection(client: Socket) {
    console.log(`✅ Cliente conectado: ${client.id}`);

    // 🔹 Enviar el último precio al cliente que se conecta
    this.sendLatestPriceToClient(client);

    // 🔹 Enviar historial de precios al conectarse
    this.sendPriceHistoryToClient(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔴 Cliente desconectado: ${client.id}`);
  }

  // 🔥 Evento para enviar la actualización del precio a todos los clientes
  async sendCryptoUpdate(price: number) {
    this.wss.emit('crypto:update', { price });
  }

  // 🔥 Evento para recibir solicitud del historial de precios
  @SubscribeMessage('crypto:getHistory')
  async handleGetHistory(client: Socket) {
    const history = await this.chartsService.getPriceHistory();
    client.emit('crypto:history', history);
  }

  // 🔥 Evento para recibir solicitud del último precio
  @SubscribeMessage('crypto:getLatest')
  async handleGetLatest(client: Socket) {
    const latestPrice = await this.chartsService.getLatestPrice();
    client.emit('crypto:latest', { price: latestPrice });
  }

  // 🔹 Función para enviar el último precio a un cliente específico
  private async sendLatestPriceToClient(client: Socket) {
    const latestPrice = await this.chartsService.getLatestPrice();
    if (latestPrice) {
      client.emit('crypto:latest', { price: latestPrice });
    }
  }

  // 🔹 Función para enviar el historial de precios a un cliente específico
  private async sendPriceHistoryToClient(client: Socket) {
    const history = await this.chartsService.getPriceHistory();
    if (history.length > 0) {
      client.emit('crypto:history', history);
    }
  }
}
