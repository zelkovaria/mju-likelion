import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  signup(signUpDto: SignupDto) {
    return this.usersService.create(signUpDto);
  }
  login(loginDto: LoginDto) {
    return this.usersService.findOne(loginDto.email);
  }
}
