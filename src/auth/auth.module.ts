import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { envs } from 'src/shared/envs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtStrategy } from 'src/guard/jwt.strategy';


@Module({

  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      global:true,
      secret:envs.JWT_ACCESS_TOKEN_SECRET,
      signOptions:{expiresIn:'1d'}
    })
  ],
  exports: [AuthService],
})
export class AuthModule {}