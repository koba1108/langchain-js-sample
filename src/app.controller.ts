import { BaseController } from "@expressots/core";
import { controller, httpGet, response, request } from "inversify-express-utils";
import { Response, Request } from "express";
import { AppUseCase } from "./app.usecase";

@controller("/")
class AppController extends BaseController {
    constructor(private appUseCase: AppUseCase) {
        super("app-controller");
    }

    @httpGet("/")
    async execute(@response() res: Response, @request() req: Request) {
        const name = req.query.name as string;
        return res.send(this.appUseCase.execute(name));
    }
}

export { AppController };
