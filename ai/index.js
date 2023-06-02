import "dotenv/config";
import { Configuration, OpenAIApi } from "openai";
import * as readline from "node:readline";
import { findBot, createBot, updateBot, unsetListBot } from "./fn.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatBot = async (data, max_tokens) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: data,
    max_tokens,
  });

  const totalToken = completion.data.usage?.total_tokens;
  const msg = completion.data.choices[0].message;

  return {
    totalToken,
    msg,
  };
};

export const sendMessage = async (msgs, uniqueId) => {
  try {
    const max_tokens = 4000;
    const data = await findBot(uniqueId);

    if (!data) {
      const result = await createBot(uniqueId, "wabot", 0, {
        role: "user",
        content: msgs,
      });

      const parsedArray = result?.context.map((jsonString) =>
        JSON.parse(jsonString)
      );

      const { totalToken, msg } = await chatBot(parsedArray, max_tokens);

      if (totalToken > max_tokens) {
        await unsetListBot(uniqueId);
        return msg;
      } else {
        await updateBot(uniqueId, totalToken, msg);
        return msg;
      }
    } else {
      const result = await updateBot(uniqueId, undefined, {
        role: "user",
        content: msgs,
      });
      const parsedArray = result?.context.map((jsonString) =>
        JSON.parse(jsonString)
      );
      const { totalToken, msg } = await chatBot(parsedArray, max_tokens);
      if (totalToken > max_tokens) {
        await unsetListBot(uniqueId);
        return msg;
      } else {
        await updateBot(uniqueId, totalToken, msg);
        return msg;
      }
    }
  } catch (error) {
    await unsetListBot(uniqueId);
    return {
      content: "Token penuh dan telah direset, silahkan memulai percakapan kembali",
    };
  }
};
