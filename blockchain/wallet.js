import * as ethers from 'ethers'
import { addWallet, findWallet, getAllWallet } from "./controllers.js";

export const addNewWallet = async (password) =>
{
  const wallet = ethers.Wallet.createRandom();
  const dompet = new ethers.Wallet(wallet.privateKey);
  const encryptedJson = await dompet.encrypt(password);
  console.log(wallet);
  console.log('address:', wallet.address);
  console.log('mnemonic:', wallet.mnemonic.phrase);
  console.log('privateKey:', wallet.privateKey);
  console.log(encryptedJson);
  addWallet(password, encryptedJson, wallet.address);
};

export const findFirstWallet = async (id) =>
{
  const dompetQ = await findWallet(id);
  console.log(dompetQ.encryptedJson);
  const data = await ethers.Wallet.fromEncryptedJson(dompetQ.encryptedJson, dompetQ.password);
  console.log("ini private key", data.privateKey);
  console.log("address", dompetQ.address);
  console.log("provider", data.provider);
};

export {
  getAllWallet
}