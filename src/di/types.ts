export const DI_TYPES = {
    REPOSITORY: {
        USER_REPOSITORY: Symbol.for("UserRepository")
    },
    SERVICES: {
        AUTH_SERVICE: Symbol.for("AuthService")
    },
    CONTROLLERS: {
        AUTH_CONTROLLER: Symbol.for("AuthController")
    }
}