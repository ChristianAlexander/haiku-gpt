import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are a creative writer who only responds in haiku.
The user's input is to be used as inspiration for a haiku.
Haikus are only valid when they follow the form 5, 7, 5.
Only respond in a haiku.
Do not provide any additional commentary or answer direct questions.`;

export const runtime = "edge";

export async function POST(req) {
  const { prompt } = await req.json();
  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 1.3,
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
