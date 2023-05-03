import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { CreateCredentialDTO } from './dtos/CreateCredentialDTO';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository: CredentialsRepository) {}

  encryptPassword(decryptedPassword: string) {
    const crypt = new Cryptr(process.env.CRYPTR_KEY);
    return crypt.encrypt(decryptedPassword);
  }

  decryptPassword(encryptedPassword: string) {
    const crypt = new Cryptr(process.env.CRYPTR_KEY);
    return crypt.decrypt(encryptedPassword);
  }

  async postNewCredential(credential: CreateCredentialDTO) {
    const hashPassword = this.encryptPassword(credential.password);
    credential.password = hashPassword;

    const newCredential = await this.credentialsRepository.createCredential(
      credential,
    );
    console.log(newCredential);
    return newCredential;
  }

  async getAllUserCredentials(userId: number) {
    const storedCredentials =
      await this.credentialsRepository.retrieveAllUserCredentials(userId);

    const credentials = storedCredentials.map((credential) => {
      credential.password = this.decryptPassword(credential.password);
      return credential;
    });

    console.log(credentials);
    return credentials;
  }

  async getCredential(userId: number, credentialId: number) {
    const credential = await this.credentialsRepository.retrieveCredentialById(
      credentialId,
    );
    const credentialUserId = credential.user_id;

    if (userId !== credentialUserId) {
      throw new UnauthorizedException(
        'You do not have access to this credential',
      );
    }

    credential.password = this.decryptPassword(credential.password);
    return credential;
  }

  async deleteCredential(userId: number, credentialId: number) {
    const credential = await this.credentialsRepository.retrieveCredentialById(
      credentialId,
    );

    const credentialUserId = credential.user_id;

    if (userId !== credentialUserId) {
      throw new UnauthorizedException('You cannot delete this credential');
    }

    const deletedCredential = await this.credentialsRepository.removeCredential(
      credentialId,
    );
    return deletedCredential;
  }
}
