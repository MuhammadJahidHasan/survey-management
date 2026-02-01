import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import { UnauthorizedException } from '../common/exception/unauthrozied-exception';

export interface AuthRequest extends Request {
    user?: {
        id: number;
        role: 'ADMIN' | 'OFFICER'; //TODO: use role enum
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            throw new UnauthorizedException('Unauthorized');
        }

        const token = header.split(' ')[1];
        req.user = verifyToken(token);
        next();
    } catch {
        throw new UnauthorizedException('Invalid token');
    }
};
