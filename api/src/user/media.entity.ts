import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Media {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  path: string;

  @Column()
  size: string;

  @CreateDateColumn()
  uploaded: string;

  @Column()
  original_name: string;

  @JoinColumn()
  @ManyToOne(() => User, (author: User) => author.media)
  user: User;
}
