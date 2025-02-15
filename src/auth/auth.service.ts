import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { envs } from 'src/shared/envs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { email, password, username } = createAuthDto;

    const existUser = await this.authRepository.findOne({ where: { email } });
    if (existUser) {
      throw new Error('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.authRepository.create({
      email,
      password: hashedPassword,
      username,
    });

    await this.authRepository.save(user);

    return {
      user,
      token: await this.signJWT({ id: user.id, email, username }),
    };
  }

  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    return {
      user,
      token: await this.signJWT({ id: user.id, email: user.email, username: user.username }),
    };
  }

  async currentUser(token: string) {
    try {
      // 🔹 Verificar el token usando el mismo secret definido en envs
      const decoded = this.jwtService.verify(token, {
        secret: envs.JWT_ACCESS_TOKEN_SECRET,
      });

      if (!decoded.id) {
        throw new UnauthorizedException('Token inválido: Falta el ID del usuario');
      }

      // 🔹 Buscar al usuario en la base de datos
      const user = await this.authRepository.findOne({ where: { id: decoded.id } });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private async signJWT(payload: any) {
    return this.jwtService.sign(payload);
  }
}
