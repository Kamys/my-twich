import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import {
  UserCredentials,
  UserView,
  ResponseJWTToken,
} from 'src/users/users.types';
import { PostgresErrorCode } from '../database/postgresErrorCodes.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserView> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
    };
  }

  async registration(param: UserCredentials): Promise<UserView> {
    const hasPassword = bcrypt.hashSync(param.password, 10);
    try {
      const newUser = await this.usersService.create({
        username: param.username,
        password: hasPassword,
      });
      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  login(user: UserCredentials): ResponseJWTToken {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
