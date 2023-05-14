import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './posts.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(private usersService: UsersService) {}

  private posts: Post[] = [];
  private postId: number;
  createPost(userId: string, createPostDto: CreatePostDto) {
    if (!userId) {
      throw new UnauthorizedException('로그인 안하셨잖아요');
    }
    const user = this.usersService.findOne(userId);

    this.postId += 1;
    const newPosts: Post = {
      id: this.postId++,
      writerId: user.email,
      content: createPostDto.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posts.push(newPosts);
    return newPosts;
  }

  findAll() {
    return this.posts;
  }

  findOne(postid: number) {
    const post = this.posts.find((post) => post.id === postid);
    if (!post) {
      throw new NotFoundException('해당 id의 포스트는 없음');
    }
    return post;
  }

  update(userId: string, postId: number, updatePostDto: UpdatePostDto) {
    const post = this.posts.find((post) => post.id === postId);
    this.usersService.findOne(userId);

    if (!userId) {
      throw new UnauthorizedException('로그인 안하셨습니다');
    }

    if (!post) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다');
    }
    this.posts = this.posts.filter((post) => post.id !== postId);
    const { content } = updatePostDto;
    post.content = content;
    post.updatedAt = new Date();

    this.posts.push(post);
    return post;
  }

  remove(userId: string, postId: number) {
    const post = this.posts.find((post) => post.id === postId);
    this.usersService.findOne(userId);
    if (!userId) {
      throw new BadRequestException('로그인이 안 디어있습니다');
    }
    if (!post) {
      throw new UnauthorizedException('해당 id의 글이 없습니다');
    }
    if (post.writerId !== userId) {
      throw new UnauthorizedException('이 글에 대한 권한이 없으세영');
    }
    this.posts = this.posts.filter((post) => post.id !== postId);
  }
}
