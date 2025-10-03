import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

/**
 * Adds X-User-Roles header for quick inspection during demo.
 * Do NOT use in production (leaks role info to intermediaries).
 */
@Injectable()
export class AuthorizationDebugInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: { roles?: string[] } }>();
    const res = context.switchToHttp().getResponse<Response>();
    if (req.user?.roles && Array.isArray(req.user.roles)) {
      try {
        res.setHeader('X-User-Roles', req.user.roles.join(','));
      } catch {
        /* swallow */
      }
    }
    return next.handle();
  }
}
