import { IAuthService } from "../services/auth.service";
import { Request, Response } from "express";
import { BaseController } from "./base.controller";

export class AuthController extends BaseController {
    private readonly authService: IAuthService;

    constructor(authService: IAuthService) {
        super();
        this.authService = authService;
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }

    async signup(req: Request, res: Response) {
        const { name, email, password, role } = req.body;
        const result = await this.authService.signup({ name, email, password, role });
        this.sendResponse(201, 'Successfully signed up', result, res);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await this.authService.login({ email, password });
        this.sendResponse(200, 'Successfully logged in', result, res);
    }

    sendResponse(statusCode: number, message: string, data: any, res: Response) {
        res.status(statusCode).json({ message, data });
    }
}

export const getAuthController = async (authService: IAuthService): Promise<AuthController> => {
    return new AuthController(authService);
}