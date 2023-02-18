import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { UserRole } from '../enums';

export const RoleGuard = (...roles: UserRole[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      if (!roles) return true;

      const request = context.switchToHttp().getRequest();
      const user = request.user as User;

      return roles.some((e) => user.role.name === e);
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
};
