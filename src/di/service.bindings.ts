import { Container } from "inversify";
import { DI_TYPES } from "./types.js";
import { IAuthService } from "../service/auth/IAuthService.js";
import { AuthService } from "../service/auth/AuthService.js";
import { ITripService } from "../service/trip/ITripService.js";
import { TripService } from "../service/trip/TripService.js";
import { IGeoLocationService } from "../service/geolocation/IGeoLocationService.js";
import { GeoLocationService } from "../service/geolocation/GeoLocationService.js";

export function bindServices(container: Container) {
    container.bind<IAuthService>(DI_TYPES.SERVICES.AUTH_SERVICE).to(AuthService).inSingletonScope();
    container.bind<ITripService>(DI_TYPES.SERVICES.TRIP_SERVICE).to(TripService).inSingletonScope();
    container.bind<IGeoLocationService>(DI_TYPES.SERVICES.GEO_LOCATION_SERVICE).to(GeoLocationService).inSingletonScope();
}