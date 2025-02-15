import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/envs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.JWT_ACCESS_TOKEN_SECRET, // ✅ USAR EL MISMO SECRET
    });
  }

  async validate(payload: any) {
    if (!payload.id) {
      throw new Error('Token inválido: falta el ID del usuario');
    }

    return { id: payload.id, email: payload.email, username: payload.username };
  }
}
