/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/auth/jwt.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.cookies['Authentication']; // 쿠키에서 JWT 꺼내기
    if (!token) return false;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req['user'] = decoded; // 요청에 사용자 정보 추가
      return true;
    } catch {
      return false;
    }
  }
}
