import { provide } from "inversify-binding-decorators";

@provide(AppUseCase)
class AppUseCase {
    execute(name: string) {
        if (name) {
            return `Hello ${name}!`;
        }
        return "Hello Expresso TS!";
    }
}

export { AppUseCase };
