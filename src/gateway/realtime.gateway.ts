import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
import { RedisService } from 'src/services/redis.service';
  
  @WebSocketGateway({ cors: true })
  export class RealTimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss!: Server;
  
    constructor(private readonly redisService: RedisService) {}
  
   
  
    handleConnection(client: Socket) {
      console.log(`✅ Cliente conectado: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`🔴 Cliente desconectado: ${client.id}`);
    }
  }
  