import { Container } from "inversify";
import { DI_TYPES } from "./types.js";
import { IAuthService } from "../service/auth/IAuthService.js";
import { AuthService } from "../service/auth/AuthService.js";

export function bindServices(container: Container) {
    container.bind<IAuthService>(DI_TYPES.SERVICES.AUTH_SERVICE).to(AuthService).inSingletonScope();
}