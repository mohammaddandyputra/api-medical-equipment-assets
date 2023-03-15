import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateJwt(id: string): Promise<any> {
    return this.userService.get(
      {
        where: { id },
      },
      ['withoutPassword', 'withRole'],
    );
  }
}
