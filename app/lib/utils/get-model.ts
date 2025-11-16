import { anthropic } from "@ai-sdk/anthropic";
import { createOllama } from "ai-sdk-ollama";
import type { LanguageModel } from "ai";

const ANTHROPIC_MODEL = "claude-haiku-4";
const OLLAMA_MODEL = "qwen2.5:7b";

function createAnthropicModel(): LanguageModel {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is required in production");
  }
  return anthropic(ANTHROPIC_MODEL);
}

function createOllamaModel(): LanguageModel {
  const baseURL = process.env.OLLAMA_BASE_URL;
  if (!baseURL) {
    throw new Error(
      "OLLAMA_BASE_URL is required for development. Start Ollama with: docker-compose -f shell/docker-compose.ollama.yml up -d"
    );
  }
  const ollama = createOllama({ baseURL });
  return ollama(OLLAMA_MODEL);
}

export function getModel(): LanguageModel {
  const isProduction = process.env.NODE_ENV === "production";
  return isProduction ? createAnthropicModel() : createOllamaModel();
}
