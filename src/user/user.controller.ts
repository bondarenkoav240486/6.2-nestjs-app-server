import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

// import { Controller, Get, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';  // переконайся, що цей імпорт правильний


@Controller('api/v1')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @UseGuards(JwtAuthGuard)
    @Post('add-user')
    async addUser(@Body() body: { name: string; email: string; phone: string }): Promise<User> {
        const user = await this.userService.createUser(body);
        console.log(user);
        return user;
    }


    @UseGuards(JwtAuthGuard)
    @Get('get-user/:id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(Number(id));
    }
}
