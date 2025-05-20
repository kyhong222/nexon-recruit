import { Request } from 'express';
import { Auth } from './auth.schema';

export class AuthCreateDto {
  name: string;
  password: string;
}

export class AuthLoginDto {
  name: string;
  password: string;
}

export interface RequestWithUser extends Request {
  user: Auth;
}
