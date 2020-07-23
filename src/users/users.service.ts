import { Injectable } from '@nestjs/common';
import { UserCredentials, UserView } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ username });
  }

  async create({username, password}: UserCredentials): Promise<UserView> {
    const newUser = await this.usersRepository.create({ username, password })
    await this.usersRepository.save(newUser);

    return newUser
  }

  async isValidStreamKey(streamKey: string): Promise<boolean> {
    console.log('UsersService.isValidStreamKey');
    const user = await this.usersRepository.findOne({ streamKey });

    return !!user
  }
}