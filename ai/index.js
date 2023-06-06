import "dotenv/config";
import { Configuration, OpenAIApi } from "openai";
import * as readline from "node:readline";
import { findBot, createBot, updateBot, unsetListBot } from "./fn.js";
import axios from "axios";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatBot = async (data) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: data,
  });

  const totalToken = completion.data.usage?.total_tokens;
  const msg = completion.data.choices[0].message;

  return {
    totalToken,
    msg,
  };
};

export const chatBot2 = async (data, maxToken) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const totalToken = response.data.usage?.total_tokens;
    const msg = response.data.choices[0].message;

    return { totalToken, msg };
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (msgs, uniqueId, type) => {
  try {
    const max_tokens = 4000;
    const data = await findBot(uniqueId);

    if (!data) {
      const result = await createBot(uniqueId, type, 0, {
        role: "user",
        content: msgs,
      });

      const parsedArray = result?.context.map((jsonString) =>
        JSON.parse(jsonString)
      );

      const { totalToken, msg } = await chatBot(parsedArray);

      if (totalToken > max_tokens) {
        await unsetListBot(uniqueId);
        return {totalToken, msg};
      } else {
        await updateBot(uniqueId, totalToken, msg);
        return {totalToken, msg};
      }
    } else {
      const result = await updateBot(uniqueId, undefined, {
        role: "user",
        content: msgs,
      });
      const parsedArray = result?.context.map((jsonString) =>
        JSON.parse(jsonString)
      );

      const { totalToken, msg } = await chatBot(parsedArray);
      if (totalToken > max_tokens) {
        await unsetListBot(uniqueId);
        return {totalToken, msg};
      } else {
        await updateBot(uniqueId, totalToken, msg);
        return {totalToken, msg};
      }
    }
  } catch (error) {
    console.log(error);
    await unsetListBot(uniqueId);
    return {
      totalToken: 0,
      msg: {
        content:
        "Token penuh dan telah direset, silahkan memulai percakapan kembali",
      }
    };
  }
};
