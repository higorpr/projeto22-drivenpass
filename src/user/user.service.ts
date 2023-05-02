import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.getUserById(userId);
    return user;
  }

  async createUser(user: CreateUserDTO) {
    const hashPassword = await bcrypt.hash(
      user.password,
      Number(process.env.SALT),
    );
    user.password = hashPassword;
    return this.userRepository.createUser(user);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }
}
