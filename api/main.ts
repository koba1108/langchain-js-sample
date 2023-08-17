import "reflect-metadata";
import { AppInstance, ServerEnvironment } from "@expressots/core";
import { container } from "./app.container";
import { appConfig } from "./config/app";
import cors from "cors";

async function bootstrap() {
  try {
    AppInstance.create(container, [
      cors({
        origin: "*",
      })
    ]);
    AppInstance.listen(appConfig.port, ServerEnvironment.Development, {
      appName: appConfig.name,
      appVersion: appConfig.version,
    });
  } catch (e: any) {
    console.error(e);
  }
}

bootstrap().finally(() => {
  const url = `http://localhost:${appConfig.port}`;
  console.log("Api started at", url);
});
