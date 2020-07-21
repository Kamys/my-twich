import { Injectable } from '@nestjs/common';
import { UserCreateParam, User } from './types';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: '1',
        username: 'john',
        password: 'changeme',
      },
      {
        id: '2',
        username: 'chris',
        password: 'secret',
      },
      {
        id: '3',
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async create({username, password}: UserCreateParam): Promise<User> {
    const newUser = { id: new Date().valueOf().toString(), username, password };
    this.users.push(newUser)
    return newUser
  }

  async isUsernameExist(username: string): Promise<boolean> {
    const user = await this.users.find(user => user.username === username);
    return !!user
  }
}