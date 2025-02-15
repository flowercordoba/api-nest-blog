import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new register';
  }

  login(createAuthDto: CreateAuthDto) {
    return 'This action login ';
  }


  currentUser() {
    return `This action returns currentUser auth`;
  }

  
}
