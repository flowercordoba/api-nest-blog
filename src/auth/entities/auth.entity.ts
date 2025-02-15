import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity() 
export class Auth {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Email único del usuario
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  // Contraseña encriptada del usuario
  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    username: string;

    
    @Column({ type: 'varchar', length: 255, nullable: true })
    photo?: string;


}
