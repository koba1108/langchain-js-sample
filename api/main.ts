import "reflect-metadata";

import { AppInstance, ServerEnvironment } from "@expressots/core";
import { container } from "./app.container";
import { appConfig } from "./config/app";

async function bootstrap() {
  try {
    AppInstance.create(container);
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
