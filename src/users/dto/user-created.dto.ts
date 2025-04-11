import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UserCreateDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  constructor(name: string, email: string) {
    super(name, email);
  }
}
