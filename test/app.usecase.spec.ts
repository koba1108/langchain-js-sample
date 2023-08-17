import "reflect-metadata";
import { AppUseCase } from "../api/usecases/app.usecase";

describe("AppUseCase", () => {
    it("should return Hello Expresso TS!", () => {
        const appUseCase = new AppUseCase();
        const result = appUseCase.execute();

        expect(result).toBe("Hello Expresso TS!");
    });
});
