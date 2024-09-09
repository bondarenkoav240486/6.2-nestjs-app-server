import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './client.model';
// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Client) private clientModel: typeof Client,
    private jwtService: JwtService,
  ) {}

  // Логіка для реєстрації клієнтів
  async register(username: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await this.clientModel.create({
      username,
      password: hashedPassword,
    });

    const payload = { username: client.username, sub: client.id };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }

  // Логіка для логіну клієнтів
  async login(username: string, password: string): Promise<any> {
    const client = await this.clientModel.findOne({ where: { username } });
    if (!client || !(await bcrypt.compare(password, client.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: client.username, sub: client.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Додатковий метод для перевірки клієнта (якщо необхідно)
  async validateClient(username: string, pass: string): Promise<any> {
    const client = await this.clientModel.findOne({ where: { username } });
    if (client && (await bcrypt.compare(pass, client.password))) {
      return client;
    }
    return null;
  }
}
