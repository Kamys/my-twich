import { Injectable } from '@nestjs/common';
import { UserCreateParam } from './types';
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

  async create({username, password}: UserCreateParam): Promise<User> {
    const newUser = { id: new Date().valueOf().toString(), username, password };
    await this.usersRepository.insert(newUser)
    return newUser
  }

  async isUsernameExist(username: string): Promise<boolean> {
    const user = await this.findOne(username);
    return !!user
  }
}