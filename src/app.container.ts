import { AppContainer } from "@expressots/core";
import { AppModule } from "./app.module";

const appContainer = new AppContainer();

const container = appContainer.create([
    AppModule,
]);

export { container };