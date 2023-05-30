import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  // private posts: Post[] = [];
  async createPost(userId: string, createPostDto: CreatePostDto) {
    if (!userId) {
      throw new UnauthorizedException('로그인 안하셨잖아요');
    }

    const user = await this.usersService.findOne(userId);

    const { content } = createPostDto;
    const post = await this.postsRepository.create({
      content,
      user,
    });
    await this.postsRepository.save(post);
  }

  findAll() {
    return this.posts;
  async findAll() {
    return await this.postsRepository.find();
  }

  findOne(postid: number) {
    const post = this.posts.find((post) => post.id === postid);
    if (!post) {
      throw new NotFoundException('해당 id의 포스트는 없음');
    }
    return post;
  }

  async update(userId: string, postId: string, updatePostDto: UpdatePostDto) {
    const { content } = updatePostDto;
    const postUser = await this.postsRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!postUser) {
      throw new NotFoundException('user not found');
    } else {
      postUser.content = content;
      await this.postsRepository.save(postUser);
      return postUser;
    } //유저 확인 userService로 쓰는거 오빠한테 물어보기
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId);
    await this.postsRepository.delete({ id });
  }
}
