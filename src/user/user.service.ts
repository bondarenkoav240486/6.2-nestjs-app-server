import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';  // Імпорт моделі користувача

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)  // Інжекція моделі користувача
        private readonly userModel: typeof User,
    ) { }

    async createUser(data: { name: string; email: string; phone: string }): Promise<User> {
        const user = new User();
        user.name = data.name;
        user.email = data.email;
        user.phone = data.phone;
        return user.save();
    }

    async getUserById(id: number): Promise<User> {
        return this.userModel.findByPk(id);
    }
}
