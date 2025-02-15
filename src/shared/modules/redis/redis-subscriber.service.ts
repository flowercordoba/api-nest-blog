import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisSubscriberService {
  private readonly subscriber: Redis;

  constructor() {
    this.subscriber = new Redis(); // Se crea un cliente separado solo para suscribirse a eventos
  }

  // 🔹 Suscribirse a un canal de Redis y ejecutar una acción cuando haya mensajes
  async subscribeToEvent(channel: string, callback: (message: any) => void): Promise<void> {
    await this.subscriber.subscribe(channel);
    console.log(`🔔 Suscrito al canal: ${channel}`);

    this.subscriber.on('message', (chan, msg) => {
      if (chan === channel) {
        console.log(`📩 Mensaje recibido en ${channel}:`, msg);
        callback(JSON.parse(msg));
      }
    });
  }
}
