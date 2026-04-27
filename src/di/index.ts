import { bindServices } from "./service.bindings.js";
import { bindRepositories } from "./repository.bindings.js";
import { bindControllers } from "./controller.bindings.js";
import { Container } from "inversify";

const container = new Container({ defaultScope: "Singleton" });

bindRepositories(container);
bindServices(container);
bindControllers(container);


export default container;