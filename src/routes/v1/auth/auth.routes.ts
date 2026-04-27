import { Router } from "express";
import container from "../../../di/index.js";
import { AuthController } from "../../../controllers/auth/AuthController.js";
import { DI_TYPES } from "../../../di/types.js";

const router = Router();
const authController = container.get<AuthController>(DI_TYPES.CONTROLLERS.AUTH_CONTROLLER);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post('/logout', authController.logout);

export default router;