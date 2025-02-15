import { Socket } from 'socket.io';

export interface IclientsConectados {
  [key: string]: Socket; // 🔹 Asegúrate de que esta línea esté bien definida
}
