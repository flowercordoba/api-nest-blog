import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { IclientsConectados } from 'src/interfaces/socket.interfaces';

@Injectable()
export class MessagesService {
  private conectarClient: IclientsConectados = {};

  registerClient(client: Socket): void {
    this.conectarClient[client.id] = client;
  }

  eliminarClient(clientID: string): void {
    delete this.conectarClient[clientID];
  }

  conteoClient(): number {
    return Object.keys(this.conectarClient).length;
  }
}
