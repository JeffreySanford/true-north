import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { ROLE_HIERARCHY, Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user as { roles?: Role[] } | undefined;
    if (!user || !user.roles) return false;
    const effective = new Set<Role>();
    for (const r of user.roles) {
      (ROLE_HIERARCHY[r as Role] || []).forEach((g) => effective.add(g));
    }
    return required.some((r) => effective.has(r));
  }
}
