import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { UnauthorizedException } from '../common/exception/unauthrozied-exception';
import { ForbiddenException } from '../common/exception/forbidden-exception';

export const roleMiddleware = (requiredRoles: ('ADMIN' | 'OFFICER')[]) => { //TODO: Need to use role enum
    return (req: AuthRequest, res: Response, next: NextFunction) => {

        try {
            const user = req.user; // set by authMiddleware
            if (!user) {
                throw new UnauthorizedException('Unauthorized');
            }

            if (!requiredRoles.includes(user.role)) {
                throw new ForbiddenException('Forbidden: insufficient role');
            }

            next();

        } catch (error) {
            next(error);
        }

    };
}
