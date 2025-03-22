import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import appConfig from './config/app.config';
import { cors } from './config/cors.config';
import { docs } from './config/docs.config';
import { HttpExceptionFilter } from './libs/exception/http-execption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const documentation = SwaggerModule.createDocument(app, docs);

  app.enableCors(cors);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  SwaggerModule.setup('docs', app, documentation);

  await app.listen(appConfig().PORT);
}
bootstrap();
