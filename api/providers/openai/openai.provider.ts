import { provide } from "inversify-binding-decorators";
import { OpenAI } from "langchain/llms/openai";
import { appConfig } from "../../config/app";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { RetrievalQAChain } from "langchain/chains";
import { BaseRetriever } from "langchain/dist/schema/retriever";

@provide(OpenaiProvider)
class OpenaiProvider {
  private _llm: OpenAI;
  private readonly _chat: ChatOpenAI;
  private readonly _serp: SerpAPI;

  constructor() {
    this._llm = new OpenAI({
      openAIApiKey: appConfig.openAiKey,
    });
    this._chat = new ChatOpenAI({
      modelName: "gpt-4",
      openAIApiKey: appConfig.openAiKey,
      temperature: 0.9,
    });
    this._serp = new SerpAPI(appConfig.serpApiKey, {
      gl: "jp",
      hl: "ja",
    });
  }

  get tools() {
    return [this._serp];
  }

  predict(prompt: string) {
    return this._llm.predict(prompt);
  }

  chat(prompt: string) {
    return this._chat.predict(prompt);
  }

  async chatWithSerpAPI(prompt: string) {
    const executor = await initializeAgentExecutorWithOptions(
      this.tools,
      this._chat,
      {
        agentType: "chat-zero-shot-react-description",
      },
    );
    return executor.run(prompt);
  }

  async chatWithRetriever(prompt: string, retriever: BaseRetriever) {
    const chain = RetrievalQAChain.fromLLM(this._chat, retriever);
    return await chain.call({
      query: prompt,
    });
  }
}

export { OpenaiProvider };
