import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfig from './config/app.config';
import { cors } from './config/cors.config';
import { HttpExceptionFilter } from './libs/exception/http-execption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(cors);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(appConfig().PORT);
}
bootstrap();
