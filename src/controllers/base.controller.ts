import { Response } from "express";

export abstract class BaseController {
    abstract sendResponse(statusCode: number, message: string, data: any, res: Response): any
}
