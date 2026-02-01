import { Router } from "express"
import { SurveyController } from "../../controllers/survey.controller";
import { asyncHandler } from "../../middlewares/async-handler.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";


export const getSurveyRouter = async (surveyController: SurveyController) => {
    const router = Router();

    router.post(
        "/create",
        authMiddleware,
        roleMiddleware(['ADMIN']),
        asyncHandler(surveyController.createSurvey)
    );

    router.get("/list", asyncHandler(surveyController.listSurveys));

    router.get(
        "/:surveyId/submissions",
        authMiddleware,
        roleMiddleware(['ADMIN']),
        asyncHandler(surveyController.viewSubmissions)
    );

    router.post(
        "/submit",
        authMiddleware,
        roleMiddleware(['OFFICER']),
        asyncHandler(surveyController.submitSurvey)
    );
    
    return router;
}