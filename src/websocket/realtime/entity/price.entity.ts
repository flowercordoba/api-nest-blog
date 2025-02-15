import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'crypto_prices' }) // 👈 Nombre de la tabla en PostgreSQL
export class CryptoPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // 👈 Almacena valores con decimales
  price: number;

  @CreateDateColumn({ type: 'timestamp' }) // 👈 Fecha automática de creación
  timestamp: Date;
}
