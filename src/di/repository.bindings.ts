import { Container } from "inversify";
import { DI_TYPES } from "./types.js";

import { IUserRepository } from "../repositories/user/IUserRepository.js";
import { UserRepository } from "../repositories/user/UserRepository.js";

export function bindRepositories(container: Container) {
    container.bind<IUserRepository>(DI_TYPES.REPOSITORY.USER_REPOSITORY).to(UserRepository).inSingletonScope();
}