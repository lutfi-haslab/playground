import { create } from "@open-wa/wa-automate";
import { sendMessage } from "./index.js";

// console.log(await sendMessage('Hello'))

create({
  sessionId: "GPT-3",
  multiDevice: true,
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: "id_ID",
  logConsole: false,
  popup: true,
  qrTimeout: 0,
}).then((client) => start(client));

function start(client) {
  client.onMessage(async (message) => {
    try {
      const { body } = message;

      const result = await sendMessage(body, message.chatId);
      console.log(result);
      console.log(message.chatId);

      await client.sendText(message.from, result?.content);
    } catch (error) {
      await client.sendText(
        message.from,
        "There is something wrong, or error in the systems. Please try again, or contact the admin"
      );
    }
  });
}
