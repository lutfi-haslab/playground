import * as readline from 'node:readline';
import { getUser, main } from './controllers.js';
import { addNewWallet, findFirstWallet, getAllWallet } from './wallet.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Add your cmd:");

rl.on('line', async (input) =>
{
  const [ cmd, dataStr ] = input.split(';');
  const data = dataStr ? JSON.parse(dataStr) : null;

  switch (cmd)
  {
    case 'addUser':
      main(data.name, data.email);
      break;
    case 'getUser':
      getUser();
      break;
    case 'createWallet':
      rl.question('Enter Password Wallet: ', async (password) =>
      {
        addNewWallet(password);
      });
      break;
    case 'getWallet':
      rl.question('Enter ID Wallet: ', async (input) =>
      {
        findFirstWallet(input);
      });
      break;
    case 'getAllWallet':
      const wallet = await getAllWallet();
      console.log(wallet)
      break;
    case '' || 'exit':
      // exit the program
      rl.close();
      break;
    default:
      console.log(`Unknown command: ${cmd}`);
      break;
  }
});



rl.on("close", () =>
{
  console.log("Bye!");
  process.exit(0);
});