import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { JwtAuthModule } from './libs/jwt-auth/jwt-auth.module';
import { HttpLoggerModule } from './logger/http-logger/http-logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ApiModule,
    UtilsModule,
    RepositoriesModule,
    ConfigModule,
    PrismaModule,
    HttpLoggerModule,
    JwtAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
