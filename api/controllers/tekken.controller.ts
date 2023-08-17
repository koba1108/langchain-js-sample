import { BaseController } from "@expressots/core";
import {
  controller,
  httpGet,
  request,
  response,
} from "inversify-express-utils";
import { Request, Response } from "express";
import { AppUseCase } from "../usecases/app.usecase";

@controller("/tekken")
class TekkenController extends BaseController {
  constructor(private appUseCase: AppUseCase) {
    super("tekken-controller");
  }

  @httpGet("/")
  async tekken(@response() res: Response, @request() req: Request) {
    const prompt = req.query.prompt as string;
    return res.send(await this.appUseCase.tekken(prompt));
  }
}

export { TekkenController };
