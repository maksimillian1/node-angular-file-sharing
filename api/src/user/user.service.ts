import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './media.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  public async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find({relations: ['media']});
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({where: {email}, relations: ['media'] });
  }

  public async create(user: any): Promise<User> {
    return await this.usersRepository.save(user);
  }

  public async creatUserMedia(id: string, file: any): Promise<Media> {
    const user = await this.usersRepository.findOneBy({id});

    return this.mediaRepository.save({
      user,
      path: file.path,
      size: file.size,
      original_name: file.originalname,
      uploaded: new Date().toISOString(),
    })
  }

}
