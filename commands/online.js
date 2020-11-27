const puppeteer = require('puppeteer');

module.exports = {
  name: 'online',
  description: 'View how many players are currently playing MapleSaga',
  execute(message, args) {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://maplesaga.com/');
      const playerCount = await page.evaluate(() => {
        return document.querySelector('.label');
      });

      message.channel.send(`There are currently ${playerCount} players online`);

      await browser.close();
    })();
  },
};

<span class="label">217 players online</span>;
