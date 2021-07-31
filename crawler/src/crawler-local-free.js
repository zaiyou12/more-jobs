const puppeteer = require('puppeteer');

const site = 'freemoa'
const pageUrl = 'https://www.freemoa.net/m4/s41?page=1'

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl);

  const articles = await page.$$eval('#projectListNew > li', (elements) =>
    elements.map((element) => {
      return {
        site: 'freemoa',
        title: element.querySelector('p.title').innerText,
        price: parseInt(element.querySelector('div:nth-child(3) > p:nth-child(1) > b').innerText.slice(0, -3).replace(/\,/g, ''), 10) * 10000,
        term: parseInt(element.querySelector('div:nth-child(3) > p:nth-child(2) > b').innerText.slice(0, -1).replace(/\,/g, ''), 10),
        work_type: element.querySelector('div:nth-child(1) > div:nth-child(2) > p').innerText,
        project_category: element.querySelectorAll('div:nth-child(2)')[1].querySelector('div').innerText,
        details: element.querySelector('div:nth-child(4) > div:nth-child(1)').innerText,
        created_time: element.querySelector('b.date').innerText.replaceAll('.', '-'),
      }
    })
  );
  await browser.close();
  return articles
}

(async () => {
  const articles = await run();
  console.log(articles);
})();
