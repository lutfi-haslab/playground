import { create } from "@open-wa/wa-automate";
import { sendMessage, chatBot } from "./index.js";
import { unsetListBot } from "./fn.js";

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
      const arr = body.split(" ");
      const words = arr.slice(1).join(" "); // "hello world this is lutfi"

      if (body.startsWith("/chat ")) {
        // do something with words
        const { totalToken, msg } = await sendMessage(words, message.chatId);
        console.log(message.chatId);
        await client.sendText(
          message.from,
          msg?.content +
            "\n" +
            `token used: ${totalToken}, cost $${(
              (totalToken * 0.002) /
              1000
            ).toFixed(5)}`
        );
      } else if (body.startsWith("/menu")) {
        await client.sendText(
          message.from,
          "Halo, selamat datang di menu chatbot:\n" +
            "/chat : untuk chatbot dengan context\n" +
            "/reset : untuk reset context\n" +
            "/ai : untuk tanya baru"
        );
      } else if (body.startsWith("/reset")) {
        const reset = await unsetListBot(message.chatId);
        if (reset) {
          console.log("reset berhasil")
          await client.sendText(message.from, "Reset berhasil");
        }
      } else if (body.startsWith("/ai ")) {
        const { totalToken, msg } = await chatBot([
          { role: "user", content: words },
        ]);
        await client.sendText(
          message.from,
          msg?.content +
            "\n" +
            `token used: ${totalToken}, cost $${(
              (totalToken * 0.002) /
              1000
            ).toFixed(5)}`
        );
      } else {
        undefined;
      }
    } catch (error) {
      await console.log(
        message.from,
        "There is something wrong, or error in the systems. Please try again, or contact the admin"
      );
    }
  });
}
