import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserCreateParam, User, UserView } from 'src/users/types';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(username: string, password: string): Promise<UserView> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password)

    if (!isCorrectPassword) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
    };
  }

  async registration(param: UserCreateParam): Promise<User> {
    const isUsernameExist = await this.usersService.isUsernameExist(param.username)
    if (isUsernameExist) {
      throw new BadRequestException('User already exist')
    }
    const hasPassword = bcrypt.hashSync(param.password, 10);
    const newUser = await this.usersService.create({
      username: param.username,
      password: hasPassword
    })

    return newUser
  }

  login(user: User) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}