import OpenAI from "openai";

export const openrouter =
  new OpenAI({
    apiKey:
      import.meta.env
        .VITE_OPENROUTER_API_KEY,

    baseURL:
      "https://openrouter.ai/api/v1",

    dangerouslyAllowBrowser: true,
  });