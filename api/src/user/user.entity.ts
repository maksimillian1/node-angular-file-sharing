import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Media } from './media.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  password: string;

  @Column()
  email: string;

  @JoinColumn()
  @OneToMany(
    () => Media,
    ({ user }: Media) => {
      return user;
    },
  )
  media: Media[];
}
