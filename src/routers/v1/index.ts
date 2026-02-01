import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller";
import { SurveyController } from "../../controllers/survey.controller";
import { getAuthRouter } from "./auth.router";
import { getSurveyRouter } from "./survey.router";

export const getV1Router = async (authController: AuthController, surveyController: SurveyController) => {
    const v1 = Router();

    v1.use('/v1/auth', await getAuthRouter(authController));
    v1.use('/v1/survey', await getSurveyRouter(surveyController));

    return v1;

}