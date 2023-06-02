import { sendMessage, chatBot } from "./index.js";

const result = await sendMessage("what is my previous question?", "wa-1");
console.log(result)

// const result = await chatBot([{ role: "user", content: "Hi!" }], 200)
// console.log(result)