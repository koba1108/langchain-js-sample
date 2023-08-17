import { BaseController } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { AppUseCase } from "../usecases/app.usecase";

interface RequestBody {
  prompt: string;
}

@controller("/tekken")
class TekkenController extends BaseController {
  constructor(private appUseCase: AppUseCase) {
    super("tekken-controller");
  }

  @httpPost("/")
  async tekken(@response() res: Response, @requestBody() body: RequestBody) {
    return res.send(await this.appUseCase.tekken(body.prompt));
  }
}

export { TekkenController };
