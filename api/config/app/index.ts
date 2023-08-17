import dotenv from "dotenv";
import path from "path";

interface AppConfig {
  name: string;
  version: string;
  port: number;
  openAiKey: string;
  serpApiKey: string;
}

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

export const appConfig: AppConfig = {
  name: process.env.APP_NAME || '',
  version: process.env.APP_VERSION || "0.0.1",
  port: Number(process.env.PORT) || 3000,
  openAiKey: process.env.OPENAI_API_KEY || "",
  serpApiKey: process.env.SERP_API_KEY || "",
};
