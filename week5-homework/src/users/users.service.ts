import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { SignupDto } from 'src/auth/dto/signup.dto';
// import { Email } from 'src/email/entities/email.entity';
// import { LoginDto } from 'src/auth/dto/login.dto';
// import { QueryRunner } from 'typeorm';

@Injectable()
export class UsersService {
  users: User[] = [];

  create(createUserDto: SignupDto) {
    const { email, name, password, verificationCode } = createUserDto;
    const exist = this.findOne(email);
    if (exist) {
      throw new ConflictException('user already exist');
    }
    const user = {
      email,
      name,
      password,
      verificationCode,
    };

    this.users.push(user);
    return user;
  }

  findOne(email: string) {
    //const { email } = loginDto;
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   const user = this.users.find((user) => user.userId === id);

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const { userId, userPassword, userName } = updateUserDto;

  //   user.userId = userId;
  //   user.userPassword = userPassword;
  //   user.userName = userName;

  //   return user;
  // }
  update(userEmail: string, updateUserDto: UpdateUserDto) {
    const { email, password } = updateUserDto;
    const user = this.findOne(userEmail);
    this.users = this.users.filter((user) => user.email !== userEmail); // 기존 정보 제거
    console.log(this.users);
    user.email = email;
    user.password = password;
    this.users.push(user);
    console.log('게시글 수정 완료'); //이름은 바꿀수 없음
  }

  remove(email: string) {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.users = this.users.filter((user) => user.email !== email);

    return user;
  }
}
