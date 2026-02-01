import { Sequelize } from "sequelize";
import { appConfig } from "../common/config/app-config";


export class ConnectDB {
    private static instance: Sequelize
    public static initialize(): Sequelize {
        return new Sequelize(appConfig.DB_NAME, appConfig.DB_USER, appConfig.DB_PASS, {
            host: appConfig.DB_HOST,
            port: Number(appConfig.DB_PORT),
            dialect: 'mysql',
            logging: false,
        });
    }

    public static getInstance(): Sequelize {
        if (ConnectDB.instance) {
            return this.instance;
        }
        this.instance = ConnectDB.initialize();
        return this.instance;
    }
}

const newSequelize = (): Sequelize => {
    return ConnectDB.getInstance();
};

export default newSequelize;