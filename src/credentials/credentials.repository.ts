import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialDTO } from './dtos/CreateCredentialDTO';
import { Credentials } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CredentialsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCredential(
    newCredential: CreateCredentialDTO,
  ): Promise<Credentials> {
    return await this.prisma.credentials.create({
      data: {
        url: newCredential.url,
        title: newCredential.title,
        username: newCredential.username,
        user_id: newCredential.userId,
        password: newCredential.password,
      },
    });
  }

  async retrieveAllUserCredentials(userId: number): Promise<Credentials[]> {
    return await this.prisma.credentials.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async retrieveCredentialById(credentialId: number): Promise<Credentials> {
    return await this.prisma.credentials.findUnique({
      where: {
        id: credentialId,
      },
    });
  }

  async removeCredential(credentialId: number): Promise<Credentials> {
    return await this.prisma.credentials.delete({
      where: {
        id: credentialId,
      },
    });
  }
}
