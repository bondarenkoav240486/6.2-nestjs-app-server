import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model'; // Модель користувача
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])], // Реєстрація моделі користувача
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Експортуємо UserService для використання в інших модулях
})
export class UserModule {}
