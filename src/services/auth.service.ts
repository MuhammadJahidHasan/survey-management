import { appConfig } from "../common/app-config";
import { IDbService } from "../database/db.interface";
import bcrypt from 'bcrypt';
import { signToken } from "../utils/jwt.utils";

export interface IAuthService {
    signup(data: SignupInput): Promise<any>;
    login(data: LoginInput): Promise<any>;
}

interface SignupInput {
    name?: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'OFFICER';
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
            throw new Error('Email already registered');
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
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(
            data.password,
            user.passwordHash
        );

        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
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

export const getAuthService = (dbService: IDbService): IAuthService => {
    return new AuthService(dbService)
}