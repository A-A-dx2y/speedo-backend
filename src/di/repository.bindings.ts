import { Container } from "inversify";
import { DI_TYPES } from "./types.js";

import { IUserRepository } from "../repositories/user/IUserRepository.js";
import { UserRepository } from "../repositories/user/UserRepository.js";
import { IGpsRepository } from "../repositories/gps/IGPSRepository.js";
import { GpsRepository } from "../repositories/gps/GPSRepository.js";
import { ITripRepository } from "../repositories/trip/ITripRepository.js";
import { TripRepository } from "../repositories/trip/TripRepository.js";

export function bindRepositories(container: Container) {
    container.bind<IUserRepository>(DI_TYPES.REPOSITORY.USER_REPOSITORY).to(UserRepository).inSingletonScope();
    container.bind<IGpsRepository>(DI_TYPES.REPOSITORY.GPS_REPOSITORY).to(GpsRepository).inSingletonScope();
    container.bind<ITripRepository>(DI_TYPES.REPOSITORY.TRIP_REPOSITORY).to(TripRepository).inSingletonScope();
}