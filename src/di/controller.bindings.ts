import { Container } from "inversify";
import { DI_TYPES } from "./types.js";
import { AuthController } from "../controllers/auth/AuthController.js";

export function bindControllers(container: Container) {
    container.bind<AuthController>(DI_TYPES.CONTROLLERS.AUTH_CONTROLLER).to(AuthController).inSingletonScope();
}
