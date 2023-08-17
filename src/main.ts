import "reflect-metadata";

import { AppInstance, ServerEnvironment } from "@expressots/core";
import { container } from "./app.container";

function getPort(): number {
    return Number(process.env.PORT) || 3000
}

async function bootstrap() {
    AppInstance.create(container);
    AppInstance.listen(getPort(), ServerEnvironment.Development);
}

bootstrap().finally(() => {
    const url = `http://localhost:${getPort()}`;
    console.log("App started at", url);
})
