/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/auth/guards/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.cookies['Authentication'];

    if (!token) throw new ForbiddenException('No token found');
    const secret = process.env.JWT_SECRET || 'default_secret';

    try {
      const payload = jwt.verify(token, secret) as { role?: string };

      req['user'] = payload;
      if (payload.role === 'admin') return true; // Admin can access everything
      if (!payload.role) throw new ForbiddenException('No role in token');
      if (!requiredRoles.includes(payload.role)) {
        throw new ForbiddenException('Insufficient role');
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new ForbiddenException('Invalid token or role');
    }
  }
}
