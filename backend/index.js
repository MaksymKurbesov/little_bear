import TelegramBot from "node-telegram-bot-api";

const token = `7230742106:AAE70XxKI-3vpo3wU4ANL6jyZaw8AZtEK9M`;
const webAppUrl = `https://3e518455420be5d53e446f019f4ffea0.serveo.net`;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // send a message to the chat acknowledging receipt of their message
  if (text === "/start") {
    bot
      .sendMessage(chatId, "Тест development", {
        reply_markup: {
          inline_keyboard: [[{ text: "Тест", web_app: { url: webAppUrl } }]],
        },
      })
      .then(() => {
        console.log("sended");
      })
      .catch(() => {
        console.log("error");
      });
  }

  if (text === "/test") {
    bot
      .sendMessage(chatId, "Тест production", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Тест",
                web_app: { url: `https://little-bear-rho.vercel.app/` },
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
