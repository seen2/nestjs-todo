import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  logger.verbose(`Listening on http://127.0.0.1:${process.env.PORT}`);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
/*
.env.development.local
DB_HOST=127.0.0.1
DB_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=task_management
PORT=3000
SALT_ROUNDS=10
JWT_SECRET_KEY=some_text_that_is_very_secret
SESSION_EXPIRES_IN=24h
DUPLICATE_USERNAME_CODE=1062

*/
