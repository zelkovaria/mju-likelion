import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('User') //User가 테이블 명으로 생기는거임
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Column({ length: 50 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 60, unique: true })
  verificationCode: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createDate: Date;

  @CreateDateColumn()
  updateDate: Date;
}
