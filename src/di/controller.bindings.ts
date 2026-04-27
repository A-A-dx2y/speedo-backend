import { Container } from "inversify";
import { DI_TYPES } from "./types.js";
import { AuthController } from "../controllers/auth/AuthController.js";
import { TripController } from "../controllers/trip/TripController.js";

export function bindControllers(container: Container) {
    container.bind<AuthController>(DI_TYPES.CONTROLLERS.AUTH_CONTROLLER).to(AuthController).inSingletonScope();
    container.bind<TripController>(DI_TYPES.CONTROLLERS.TRIP_CONTROLLER).to(TripController).inSingletonScope();
}
