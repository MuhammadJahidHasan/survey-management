import { appConfig } from "../common/config/app-config";
import { IDbService } from "../database/db.interface";
import bcrypt from 'bcrypt';
import { signToken } from "../utils/jwt.utils";
import { BadRequestException } from "../common/exception/bad-request-exception";
import { UnauthorizedException } from "../common/exception/unauthrozied-exception";

export interface IAuthService {
    signup(data: SignupInput): Promise<any>;
    login(data: LoginInput): Promise<any>;
}

interface SignupInput {
    name?: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'OFFICER'; // TODO: Use enum
}
  
  interface LoginInput {
    email: string;
    password: string;
  }

class AuthService implements IAuthService {
    constructor(private readonly dbService: IDbService) {}
    async signup(data: SignupInput) {
        const existingUser = await this.dbService.getUser(data.email);

        if (existingUser) {
            throw new BadRequestException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.dbService.createUser({
            name: data.name,
            email: data.email,
            passwordHash: hashedPassword,
            role: data.role,
        });

        const token = signToken({
            id: user.id!,
            role: user.role,
        });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }

    async login(data: LoginInput) {
        const user = await this.dbService.getUser(data.email);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(
            data.password,
            user.passwordHash
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = signToken({
            id: user.id!,
            role: user.role,
        });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }

}

export const getAuthService = async (dbService: IDbService): Promise<IAuthService> => {
    return new AuthService(dbService)
}