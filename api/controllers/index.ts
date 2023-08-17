import { CreateModule } from "@expressots/core";
import { AppController } from "./app.controller";
import { TekkenController } from "./tekken.controller";

const AppModule = CreateModule([AppController, TekkenController]);

export const Modules = [AppModule];
