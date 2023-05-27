import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
// import { Email } from 'src/email/entities/email.entity';
// import { LoginDto } from 'src/auth/dto/login.dto';
// import { QueryRunner } from 'typeorm';

@Injectable()
export class UsersService {
  // users: User[] = [];
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: SignupDto) {
    const { email, name, password } = createUserDto;
    // select 1 from user where email = "asfd@afsd;jlk.com";
    // const user = await this.usersRepository.findOne({
    //   where: {
    //     email: email,
    //   },
    // }); //findOneBy와 차이점 where절

    // const exist = this.findOne(email); // 저장소에서 email을 가진 user 찾아줘
    const exist = await this.usersRepository.findOneBy({ email: email });
    if (exist) {
      throw new ConflictException('user already exist');
    }

    // user 만들기
    // const user = {
    //   email,
    //   name,
    //   password,
    //   verificationCode,
    // };

    // const user = new UserEntity();
    const user = await this.usersRepository.create({
      email,
      name,
      password,
      //인증 코드 진짜로 바꿔야함
      verificationCode: '12345678',
    });

    //메모리에 들어간 값들을 users에 넣어줌
    // 만든 user를 저장
    // this.users.push(user); // 메모리에 저장
    await this.usersRepository.save(user);
    return user;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['posts'], //users.entitu 중 posts: Post[];에 있는 키값인 posts를 가져옴
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
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
  async update(id: string, updateUserDto: UpdateUserDto) {
    const { name, email, password } = updateUserDto;
    const user = await this.findOne(id);
    user.name = name;
    user.email = email;
    user.password = password;
    await this.usersRepository.save(user);
    // const user = await this.usersRepository.update({ id }, { email, password });
    // this.users = this.users.filter((user) => user.email !== userEmail); // 기존 정보 제거
    // console.log(this.users);
    // user.email = email;
    // user.password = password;
    // this.users.push(user);
    // console.log('게시글 수정 완료'); //이름은 바꿀수 없음
    return user;
  }

  async remove(id: string) {
    // const user = this.users.find((user) => user.email === email);
    await this.findOne(id);
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    // this.users = this.users.filter((user) => user.email !== email);
    // return user;
    await this.usersRepository.delete({ id });
  }
}
