const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true, defaultViewport: null });

        const page = await browser.newPage();

        await page.goto('https://www.worldometers.info/coronavirus/country/india/');

        const results = await page.$$eval('#maincounter-wrap', (divs) => {
            return divs.map(div => {
                const data = {};
                const heading = div.querySelector('h1');
                data.heading = heading.innerText;
                const count = div.querySelector('.maincounter-number');
                data.count = count.innerText;
                return data;
            });
        });

        console.log(results);

        // await browser.close();

    } catch (e) {
        console.log('Our error', e);
    }

})();