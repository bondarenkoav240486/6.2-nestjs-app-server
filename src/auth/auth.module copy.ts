import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';  // Імпортуємо модуль користувача

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,  // Імпортуємо UserModule для доступу до UserService
  ],
  // providers: [JwtStrategy, UserService],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
