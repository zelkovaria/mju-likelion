import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signUpDto: SignupDto) {
    return await this.usersService.create(signUpDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (loginDto.password !== user.password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    return user.id;
  }
}
