import doteEnv from "dotenv";
doteEnv.config();

import TelegramBot from "node-telegram-bot-api";
const webAppUrl = `https://b24b53eea1c051a7ba3aca21584f956c.serveo.net`;
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // send a message to the chat acknowledging receipt of their message
  if (text === "/start") {
    bot
      .sendMessage(
        chatId,
        "<b>Hello! Welcome to The Little Bear 🐻\n\n</b>" +
          "You're now in the world of dancing bears that earn you crypto!\n" +
          "Tap the screen, collect coins, and boost your income with every dance.\n\n" +
          "Invite your friends, dance together, and earn even more coins!",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Play in 1 click 🐻",
                  web_app: { url: `https://littlebear-app.online` },
                },
              ],
            ],
          },
          parse_mode: "HTML",
        },
      )
      .then(() => {
        console.log("sended");
      })
      .catch(() => {
        console.log("error");
      });
  }

  if (text === "/test_development") {
    bot
      .sendMessage(chatId, "Тест production", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Тест",
                web_app: { url: webAppUrl },
              },
            ],
          ],
        },
      })
      .then(() => {
        console.log("sended");
      })
      .catch(() => {
        console.log("error");
      });
  }
});
