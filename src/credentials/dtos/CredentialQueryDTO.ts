import { IsNumber } from 'class-validator';

export class CredentialQueryDTO {
  @IsNumber()
  credentialId: number;
}
