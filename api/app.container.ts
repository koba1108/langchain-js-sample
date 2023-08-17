import { AppContainer } from "@expressots/core";
import { Modules } from "./controllers";

const appContainer = new AppContainer();
const container = appContainer.create(Modules);

export { container };
