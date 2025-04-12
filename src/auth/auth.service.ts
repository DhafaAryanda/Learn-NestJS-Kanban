import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { TokenDto } from './dto/token.dto';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import { UserLoggedDto } from 'src/users/dto/user-logged.dto';
import { AUTH_SECRET } from './constant/constant';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async genToken(usr: User): Promise<TokenDto> {
    const payload = {
      jwtId: randomUUID(),
      sub: usr.id,
      name: usr.name,
      email: usr.email,
    };

    return {
      kind: 'Bearer',
      token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyToken(token: string): Promise<UserLoggedDto> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: AUTH_SECRET,
      algorithms: ['HS256'],
      audience: 'kanban-be',
      issuer: 'kanban-be',
    });

    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
    };
  }
}
