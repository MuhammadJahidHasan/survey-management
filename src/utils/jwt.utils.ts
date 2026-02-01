import jwt from 'jsonwebtoken';
import { appConfig } from '../common/config/app-config';

const JWT_SECRET = appConfig.JWT_SECRET as string;
const JWT_EXPIRES_IN = '7d';

export interface JwtPayload {
  id: number;
  role: 'ADMIN' | 'OFFICER';
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
