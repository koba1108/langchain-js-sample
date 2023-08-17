import { provide } from "inversify-binding-decorators";
import { OpenaiProvider } from "../providers/openai/openai.provider";
import { Tekken7Repository } from "../repositories/tekken7";

@provide(AppUseCase)
class AppUseCase {
  constructor(
    private openai: OpenaiProvider,
    private tekken7: Tekken7Repository,
  ) {}

  async llm(txt: string) {
    return await this.openai.predict(txt);
  }

  async chat(prompt: string) {
    return await this.openai.chatWithSerpAPI(prompt);
  }

  async tekken(prompt: string) {
    await this.tekken7.initCsv("../../statics/csv/hwoarang.csv");
    const retriever = this.tekken7.retriever();
    if (retriever) {
      return await this.openai.chatWithRetriever(prompt, retriever);
    }
  }
}

export { AppUseCase };
