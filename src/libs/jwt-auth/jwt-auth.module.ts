import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import jwtConfig from 'src/config/jwt.config';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: jwtConfig().JWT_SECRET,
      signOptions: {
        expiresIn: jwtConfig().JWT_EXPIRED,
      },
    }),
  ],
  providers: [JwtStrategy, JwtService],
  exports: [JwtService],
})
export class JwtAuthModule {}
