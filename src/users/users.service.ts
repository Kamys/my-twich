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
    return this.usersRepository.findOne({
      username: username.toLocaleLowerCase(),
    });
  }

  async getAllStreamers(): Promise<User[] | undefined> {
    return this.usersRepository.find({ isBroadcastOnline: true });
  }

  async create({ username, password }: UserCredentials): Promise<UserView> {
    const newUser = await this.usersRepository.create({
      username: username.toLocaleLowerCase(),
      password,
    });
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async isValidStreamKey(streamKey: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ streamKey });

    return !!user;
  }
}
