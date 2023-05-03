import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepository } from './credentials.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [CredentialsService, CredentialsRepository],
  controllers: [CredentialsController],
  imports: [PrismaModule, AuthModule, UserModule],
})
export class CredentialsModule {}
