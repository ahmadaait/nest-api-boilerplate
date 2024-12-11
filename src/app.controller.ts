import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoriesService } from './repositories/repositories.service';
import { UtilsService } from './utils/utils.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private repo: RepositoriesService,
    private util: UtilsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest() {
    try {
      throw new Error('Testing Error');
    } catch (error) {
      this.util.logger(AppController.name).error(error);
    }
    return 'test';
  }

  @Get('test-response')
  getTestResponse() {
    return this.util.response.json({
      statusCode: 400,
      message: 'test response',
      data: null,
    });
  }

  @Get('test-error')
  getTestError() {
    throw new HttpException('This is error', HttpStatus.BAD_REQUEST);
  }
}
