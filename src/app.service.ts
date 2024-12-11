import { HttpStatus, Injectable } from '@nestjs/common';
import appConfig from './config/app.config';
import { UtilsService } from './utils/utils.service';

@Injectable()
export class AppService {
  constructor(private util: UtilsService) {}

  getHello(): string {
    return 'Nest API Boilerplate v0.0.1';
  }
}
