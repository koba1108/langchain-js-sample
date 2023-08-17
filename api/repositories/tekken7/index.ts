import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { provide } from "inversify-binding-decorators";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { HtmlToTextTransformer } from "langchain/document_transformers/html_to_text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import path from "path";

@provide(Tekken7Repository)
class Tekken7Repository {
  store?: HNSWLib;

  get embeddings() {
    return new OpenAIEmbeddings();
  }

  get splitter() {
    return RecursiveCharacterTextSplitter.fromLanguage("html");
  }

  retriever() {
    return this.store?.asRetriever();
  }

  async init(url: string) {
    if (!this.store) {
      const webDocs = await new CheerioWebBaseLoader(url, {
        selector: "table",
      }).load();
      const transformer = new HtmlToTextTransformer();
      const docs = await this.splitter.pipe(transformer).invoke(webDocs);
      this.store = await HNSWLib.fromDocuments(docs, this.embeddings);
    }
  }

  async initCsv(filePath: string) {
    if (!this.store) {
      const loader = new CSVLoader(path.resolve(__dirname, filePath));
      const docs = await loader.load();
      console.log({ docs });
      this.store = await HNSWLib.fromDocuments(docs, this.embeddings);
    }
  }
}

export { Tekken7Repository };
