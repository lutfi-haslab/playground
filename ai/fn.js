import prisma from "../libs/prisma.js";

export const createBot = async (uniqueId, type, usedToken, context) => {
  const createBot = await prisma.chatbot.create({
    data: {
      uniqueId,
      type,
      usedToken,
      context: JSON.stringify(context),
    },
  });

  return createBot;
};

export const updateBot = async (uniqueId, usedToken, context) => {
  const updateBot = await prisma.chatbot.update({
    where: {
      uniqueId,
    },
    data: {
      usedToken,
      context: {
        push: JSON.stringify(context),
      },
    },
  });
  return updateBot;
};

export const unsetListBot = async (uniqueId) => {
  const updateBot = await prisma.chatbot.update({
    where: {
      uniqueId,
    },
    data: {
      usedToken: 0,
      context: JSON.stringify({ role: "user", content: "Hi!" }),
    },
  });
  return updateBot;
};

export const findBot = async (uniqueId) => {
  const findBot = await prisma.chatbot.findUnique({
    where: {
      uniqueId,
    },
  });
  return findBot;
};