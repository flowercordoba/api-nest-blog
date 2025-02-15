import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { NewMessageDto } from 'src/dtos/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss!: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token as string;

      if (!token) {
        throw new WsException('No token provided');
      }

      const decoded = this.jwtService.verify(token);
      client.data.user = decoded; // 🔹 Guardamos el usuario en `client.data`
      
      this.messagesService.registerClient(client);
      client.join('ventas');

      console.log(`✅ Cliente autenticado: ${decoded.username} (${client.id})`);
      this.wss.emit('clients-updated', this.messagesService.getClientsCount());
    } catch (error) {
      console.log('❌ Error en la autenticación WebSocket:', error.message);
      client.disconnect(); // 🔹 Desconectar si el token no es válido
    }
  }

  handleDisconnect(client: Socket) {
    this.messagesService.eliminarClient(client.id);
    this.wss.emit('clients-updated', this.messagesService.getClientsCount());
  }

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() message: { sender: string; text: string }) {
    console.log(`📩 Mensaje recibido de ${message.sender}: ${message.text}`);
    this.wss.emit('new-message', message);
  }

  @SubscribeMessage('new-message-update')
  async handleMessagePayload(client: Socket, payload: NewMessageDto) {
    if (!client.data.user) {
      throw new WsException('Usuario no autenticado');
    }

    this.wss.emit('new-message-update-from-server', {
      username: client.data.user.username,
      message: payload.message || 'oh no'
    });
  }
}
