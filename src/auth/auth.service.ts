import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { email, password, username } = createAuthDto;

    // Verificar si el usuario ya existe
    const existUser = await this.authRepository.findOne({ where: { email } });
    if (existUser) {
      throw new Error('El usuario ya existe');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = this.authRepository.create({
      email,
      password: hashedPassword,
      username,
    });

    await this.authRepository.save(user);

    return {
      user,
      token: await this.signJWT({ email, username }),
    };
  }

  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    // Buscar el usuario por email
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    return {
      user,
      token: await this.signJWT({ email: user.email, username: user.username }),
    };
  }

  async currentUser(token: string) {
    try {
      const user = this.jwtService.verify(token);
      return {
        user,
        token: await this.signJWT(user),
      };
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  private async signJWT(payload: any) {
    return this.jwtService.sign(payload);
  }
}
