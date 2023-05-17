import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [PostsModule],
})
export class CommentsModule {}
