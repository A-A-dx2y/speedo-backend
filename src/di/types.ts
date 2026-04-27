export const DI_TYPES = {
    REPOSITORY: {
        USER_REPOSITORY: Symbol.for("UserRepository"),
        GPS_REPOSITORY: Symbol.for("GpsRepository"),
        TRIP_REPOSITORY: Symbol.for("TripRepository")
    },
    SERVICES: {
        AUTH_SERVICE: Symbol.for("AuthService"),
        TRIP_SERVICE: Symbol.for("TripService"),
        GEO_LOCATION_SERVICE: Symbol.for("GeoLocationService")
    },
    CONTROLLERS: {
        AUTH_CONTROLLER: Symbol.for("AuthController"),
        TRIP_CONTROLLER: Symbol.for("TripController")
    }
}