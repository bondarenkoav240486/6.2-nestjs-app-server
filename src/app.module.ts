// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';  // додаємо AuthModule


import * as dotenv from 'dotenv';
dotenv.config();

// console.log('App module Database User:', process.env.DATABASE_USER);
console.log('App module JWT_SECRET:', process.env.JWT_SECRET);



@Module({
    imports: [
        // SequelizeModule.forRoot({
        //     dialect: 'mysql',
        //     host: 'localhost',
        //     port: 3306,
        //     username: 'root',
        //     password: 'root', 
        //     database: '6_2_test_w_db', 
        //     autoLoadModels: true,
        //     synchronize: true,
        // }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadModels: true,
            synchronize: true,
        }),
        UserModule,
        AuthModule,  // імпортуємо модуль авторизації
    ],
})
export class AppModule { }

