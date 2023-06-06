import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { sendMessage, chatBot } from "./index.js";
import { unsetListBot } from "./fn.js";

const API_KEY = process.env.TELEBOT_KEY;

const bot = new TelegramBot(API_KEY, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/menu/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Halo, selamat datang di menu chatbot:\n" +
      "/chat : untuk chatbot dengan context\n" +
      "/reset : untuk reset context\n" +
      "/ai : untuk tanya baru"
  );
});

bot.onText(/\/chat (.+)/, async (msgs, match) => {
  const chatId = msgs.chat.id;
  const words = match[1];
  const { totalToken, msg } = await sendMessage(words, JSON.stringify(chatId), "telebot");
  await bot.sendMessage(
    chatId,
    msg?.content +
      "\n" +
      `token used: ${totalToken}, cost Rp${(((totalToken * 0.002) / 1000)*14879.95).toFixed(
        2
      )}`
  );
});

bot.onText(/\/ai (.+)/, async (msgs, match) => {
  const chatId = msgs.chat.id;
  const words = match[1];
  const { totalToken, msg } = await chatBot([{ role: "user", content: words }]);
  await bot.sendMessage(
    chatId,
    msg?.content +
      "\n" +
      `token used: ${totalToken}, cost Rp${(((totalToken * 0.002) / 1000)*14879.95).toFixed(
        2
      )}`
  );
});

bot.onText(/\/reset/, async (msg, match) => {
  const chatId = msg.chat.id;
  const reset = await unsetListBot(JSON.stringify(chatId));
  if (reset) {
    console.log("reset berhasil");
    await bot.sendMessage(chatId, "Reset berhasil");
  }
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", () => {});
