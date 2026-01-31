import dotenv from 'dotenv'

dotenv.config();

export interface IAppConfig {
    APP_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    DB_HOST: string;
    DB_PORT: string;
    JWT_SECRET: string;
}

export const appConfig: IAppConfig = {
    APP_PORT: process.env.APP_PORT!,
    DB_NAME:  process.env.DB_NAME!,
    DB_USER: process.env.DB_USER!,
    DB_PASS: process.env.DB_PASS!,
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: process.env.DB_PORT!,
    JWT_SECRET: process.env.JWT_SECRET!,

}