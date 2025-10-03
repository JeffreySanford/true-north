import { Role } from './roles.enum';

export interface User {
  id: string;
  email: string;
  displayName: string;
  passwordHash: string;
  roles: Role[];
  createdAt: string; // ISO string
  status: 'active' | 'disabled';
}

export interface JwtPayload {
  sub: string; // user id
  email: string;
  roles: Role[];
  iat?: number;
  exp?: number;
}
