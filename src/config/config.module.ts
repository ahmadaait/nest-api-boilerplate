import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import appConfig from './app.config';
import jwtConfig from './jwt.config';

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig],
    }),
  ],
})
export class ConfigModule {}
