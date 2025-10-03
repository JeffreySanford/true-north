import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthorizationDebugInterceptor } from './authorization.interceptor';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'dev-secret',
      signOptions: { expiresIn: process.env['JWT_EXPIRES_IN'] || '3600s' },
    }),
  ],
  providers: [
    AuthService,
    JwtAuthStrategy,
    RolesGuard,
    JwtAuthGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthorizationDebugInterceptor,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
