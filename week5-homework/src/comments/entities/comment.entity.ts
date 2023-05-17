import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('Comment')
export class Comment {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Column({ length: 300 })
  content: string;

  @CreateDateColumn()
  createDate: Date;

  @CreateDateColumn()
  updateDate: Date;
}
