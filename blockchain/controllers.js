import prisma from "../libs/prisma.js";

export const main = async (name, email) =>
{
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });
  console.log(user);
};

export const getUser = async () =>
{
  const user = await prisma.user.findMany();
  console.log(user);
};

export const addWallet = async (password, encryptedJson, address) =>
{
  const wallet = await prisma.wallet.create({
    data: {
      password,
      encryptedJson,
      address
    }
  });
  return wallet;
};

export const findWallet = async (id) =>
{
  const wallet = await prisma.wallet.findFirst({
    where: {
      id
    }
  });

  return wallet;
};

export const getAllWallet = async () =>
{
  const wallet = await prisma.wallet.findMany();
  return wallet;
};