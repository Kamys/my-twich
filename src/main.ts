import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodeMediaServer } from './NodeMediaServer';
import { UsersService } from './users/users.service';
import { ConfigService } from './config/config.service';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // TODO: Remove enableCors for production
  await app.listen(3000);

  const usersService = app.get(UsersService);
  const configService = app.get(ConfigService);

  const nms = new NodeMediaServer(usersService, configService);
  nms.init();
};

bootstrap();
