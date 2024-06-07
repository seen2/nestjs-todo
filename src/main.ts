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
