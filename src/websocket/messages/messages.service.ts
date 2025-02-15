import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { IclientsConectados } from 'src/shared/interfaces/socket.interfaces';

@Injectable()
export class MessagesService {
  private conectarClient: Record<string, Socket> = {}; // 🔹 Cambiado a un objeto de registros
  registerClient(client: Socket): void {
    this.conectarClient[client.id] = client;
    this.emitConnectedClients();
  }

  eliminarClient(clientID: string): void {
    delete this.conectarClient[clientID];
    this.emitConnectedClients();
  }

  conteoClient(): number {
    return Object.keys(this.conectarClient).length;
    
  }
  getClient(clientID: string): Socket | undefined {
    return this.conectarClient[clientID]; // 🔹 Retorna el cliente si existe
  }

  getClientsCount(): number {
    return Object.keys(this.conectarClient).length;
  }

  private emitConnectedClients(): void {
    const clientsCount = this.getClientsCount();
    Object.values(this.conectarClient).forEach(client => {
      client.emit('clients_connected', clientsCount); // 🔹 Emitimos solo el número de clientes
    });
  }

}
