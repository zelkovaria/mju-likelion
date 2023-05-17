import { UserEntity } from 'src/users/entities/users.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('Post')
export class Post {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Column({ length: 300 })
  content: string;

  @CreateDateColumn()
  createDate: Date;

  @CreateDateColumn()
  updateDate: Date;
}
