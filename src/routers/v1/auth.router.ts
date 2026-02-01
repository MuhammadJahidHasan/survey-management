import { Router } from "express"
import { AuthController } from "../../controllers/auth.controller";
import { asyncHandler } from "../../middlewares/async-handler.middleware";


export const getAuthRouter = async (authController: AuthController) => {
    const router = Router();

    router.post("/signup", asyncHandler(authController.signup));
    router.post("/login", asyncHandler(authController.login));
    
    return router;
}