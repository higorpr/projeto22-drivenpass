import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorators/users.decorator';
import { User } from '@prisma/client';
import { CreateCredentialDTO } from './dtos/CreateCredentialDTO';
import { CredentialQueryDTO } from './dtos/CredentialQueryDTO';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post('newCredential')
  @UseGuards(AuthGuard)
  async postCredential(
    @AuthUser() user: User,
    @Body() body: CreateCredentialDTO,
  ) {
    console.log(body);
    try {
      const newCredential = await this.credentialsService.postNewCredential(
        body,
      );
      return newCredential;
    } catch (err) {
      console.log(err);
      if (err.code === 'P2002') {
        throw new HttpException(
          `Database conflict: title already used with provided username`,
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getAllUserCredentials(@AuthUser() user: User) {
    const userId = user.id;

    try {
      const credentials = await this.credentialsService.getAllUserCredentials(
        Number(userId),
      );
      return credentials;
    } catch (err) {
      console.log(err);
    }
  }

  @Get('credential')
  @UseGuards(AuthGuard)
  async getCredential(
    @AuthUser() user: User,
    @Query() query: CredentialQueryDTO,
  ) {
    const userId = user.id;
    const { credentialId } = query;

    try {
      const credential = await this.credentialsService.getCredential(
        Number(userId),
        Number(credentialId),
      );
      return credential;
    } catch (err) {
      console.log(err);
    }
  }

  @Delete('credential')
  @UseGuards(AuthGuard)
  async deleteCredential(
    @AuthUser() user: User,
    @Body() body: CredentialQueryDTO,
  ) {
    const userId = user.id;
    const { credentialId } = body;
    try {
      const deletedCredential = await this.credentialsService.deleteCredential(
        Number(userId),
        Number(credentialId),
      );
      console.log(deletedCredential);
      return deletedCredential;
    } catch (err) {
      console.log(err);
    }
  }
}
