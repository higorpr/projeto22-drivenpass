import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: number): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { id: userId },
    });
  }

  async createUser(user: CreateUserDTO): Promise<User> {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
}
