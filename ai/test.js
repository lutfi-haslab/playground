import { sendMessage, chatBot, chatBot2 } from "./index.js";
import { findBot } from "./fn.js";

// const result = await sendMessage("what is my previous question?", "wa-1");
// console.log(result)

// const result = await chatBot([{ role: "user", content: "Hi!" }], 200)
// console.log(result)

const data = await findBot("6281380701384@c.us");
console.log(data)
const parsedArray = data?.context.map((jsonString) => JSON.parse(jsonString));
const fixedChatbotResponse = parsedArray.map(obj => {
  return {
    ...obj,
    content: obj.content.replace(/\\n/g, '\n') // remove new line characters
  }
});

// console.log(parsedArray);
// console.log(fixedChatbotResponse)

const context = [
  {"role":"user","content":"buatkan puisi"},
  {"role":"assistant","content":"Hello"},
  {"role":"user","content":"buatkan puisi"},
  {
    role: 'assistant',
    content: 'Melangkah di bawah langit biru\n' +
      'Merasakan hembusan angin yang sejuk\n' +
      'Matahari bersinar terang menyinari negeri\n' +
      'Menjadikan alam semesta terasa hidup\n' +
      '\n' +
      'Awan putih berarak pelan di langit\n' +
      'Menambah pesona pemandangan yang indah\n' +
      'Burung-burung berkicau riang di pohon\n' +
      'Menyambut keindahan yang tiada tara\n' +
      '\n' +
      'Ini adalah ciptaan Tuhan yang terindah\n' +
      'Kuucap syukur atas nikmat-Nya yang tiada terkira\n' +
      'Semoga alam ini tetap terjaga kelestariannya\n' +
      'Supaya kehidupan kita di bumi tetap bahagia'
  },
  {"role":"user","content":"buatkan lagi yang lebih pendek"},
]

const result = await chatBot2(context, 4000)
console.log(result)