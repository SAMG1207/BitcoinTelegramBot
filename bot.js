const { fetchCoinGecko } = require("./utils.js/fetchPrice");
require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_CODE;

const telegramBot = new TelegramBot(token, { polling: true });

const options = {
  reply_markup: {
    keyboard: [[{ text: "Press here" }]], // Botón personalizado
    resize_keyboard: true,
    one_time_keyboard: false, // Mantiene el teclado visible
  },
};

// Manejo del comando /start
telegramBot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id; // Define chatId desde el mensaje recibido

  telegramBot.sendMessage(
    chatId,
    `Hi, I am The Bitcoin Bot. My mission here is to simply tell you the current price of Bitcoin, just press the button!`,
    options
  );
});

// Escucha los mensajes
telegramBot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === "Press here") {
    try {
      const price = await fetchCoinGecko(); // Llama a la función para obtener el precio
      telegramBot.sendMessage(
        chatId,
        `The current price of Bitcoin is $${price}.`
      );
    } catch (error) {
      telegramBot.sendMessage(
        chatId,
        "Sorry, I couldn't fetch the price. Please try again later."
      );
      console.error(error);
    }
  } else if (msg.text !== "/start") {
    // Responde si escriben algo distinto a "Press here"
    telegramBot.sendMessage(
      chatId,
      "Please use the button to interact with me.",
      options
    );
  }
});
