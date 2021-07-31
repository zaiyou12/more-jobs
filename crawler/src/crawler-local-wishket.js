const puppeteer = require('puppeteer');

const site = 'wishket'
const pageUrl = 'https://www.wishket.com/project/?order_by=submit&page=1'

// FIXME: Cannot read constant value in below map function
// const selector = {
//   article: '#resultListWrap > div > div > div',
//   title: 'h4',
//   price: 'p.estimated-price > span.estimated-data',
//   term: 'p.estimated-term > span.estimated-data',
//   work_type: 'div.simple-chip',
//   project_category: 'p.category',
//   project_field: 'p.subcategory',
//   details: 'div.project-description',
//   created_time: 'div.project-recruit-guide',
//   url: 'a'
// }

// const getInnerText = (element, selector) => {
//   return element.querySelector(selector).innerText;
// }
// const getInnerTextInNumber = (element, selector) => {
//   return parseInt(element.querySelector(selector).innerText.slice(0, -1).replace(/\,/g, ''), 10);
// }
// const getArticle = (element) => {
//   return {
//     site: site,
//     title: getInnerText(element, selector.title),
//     price: getInnerTextInNumber(element, selector.price),
//     term: getInnerTextInNumber(element, selector.term),
//     work_type: getInnerText(element, selector.work_type),
//     project_category: getInnerText(element, selector.project_category),
//     project_field: getInnerText(element, selector.project_field),
//     details: getInnerText(element, selector.details),
//     created_time: getInnerText(element, selector.created_time),
//     url: element.querySelector(selector.url).href
//   }
// }

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl);

  const articles = await page.$$eval('#resultListWrap > div > div > div', (elements) =>
    elements.map((element) => {
      return {
        site: 'wishket',
        title: element.querySelector('h4').innerText,
        price: parseInt(element.querySelector('p.estimated-price > span.estimated-data').innerText.slice(0, -1).replace(/\,/g, ''), 10),
        term: parseInt(element.querySelector('p.estimated-term > span.estimated-data').innerText.slice(0, -1).replace(/\,/g, ''), 10),
        work_type: element.querySelector('div.simple-chip').innerText,
        project_category: element.querySelector('p.category').innerText,
        project_field: element.querySelector('p.subcategory').innerText,
        details: element.querySelector('div.project-description').innerText,
        created_time: element.querySelector('div.project-recruit-guide').innerText.slice(6, -1).replaceAll('.', '-'),
        url: element.querySelector('a').href
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
