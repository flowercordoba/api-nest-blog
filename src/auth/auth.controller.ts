import { Controller,Headers, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  registro(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Get('current-user')
  @UseGuards(JwtAuthGuard) 
  async currentUser(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new Error('No se recibió token en los headers');
    }

    const token = authHeader.replace('Bearer ', '');
    return this.authService.currentUser(token);
  }
  
}
