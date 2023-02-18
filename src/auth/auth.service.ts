import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateJwt(id: string): Promise<any> {
    return this.usersService.get(
      {
        where: { id },
      },
      ['withoutPassword', 'withRole'],
    );
  }
}
