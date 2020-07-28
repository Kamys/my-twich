import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodeMediaServer } from './NodeMediaServer';
import { UsersService } from './users/users.service';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  const usersService = app.get(UsersService);
  await app.listen(3000);

  const nms = new NodeMediaServer(usersService);
  nms.init();
};

bootstrap();
