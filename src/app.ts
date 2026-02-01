import express from 'express';
import { getDbService } from './database/db.service';
import { getAuthService } from './services/auth.service';
import { getSurveyService } from './services/survey.service';
import { getAuthController } from './controllers/auth.controller';
import { getSurveyController } from './controllers/survey.controller';
import { getV1Router } from './routers/v1';
import { globalErrorHandler } from './middlewares/global-error-handler.middleware';

const app = express();

app.use(express.json());

(async () => {
    // initializing Database service
    const dbService = await getDbService();

     // initializing services
    const authService = await getAuthService(dbService);
    const surveyService = await getSurveyService(dbService);

    // initializing controllers
    const authController = await getAuthController(authService);
    const surveyController = await getSurveyController(surveyService);

    // initializing Routers
    const v1Router = await getV1Router(authController, surveyController)
    app.use('/api', v1Router);

    // Global error handler
    app.use(globalErrorHandler);



})()

export default app;
