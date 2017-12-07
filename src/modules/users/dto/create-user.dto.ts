export class CreateUserDto {
  readonly name: string;
  readonly age?: number;
  readonly email?: string;
  readonly password?: string;
}