import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCredentials, UserView } from './users.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

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

  async setIsBroadcastOnline(username: string, status: boolean): Promise<void> {
    const user = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new NotFoundException(
        `User with username "${username}" not found!`,
      );
    }

    user.isBroadcastOnline = status;
    await user.save();
  }
}
