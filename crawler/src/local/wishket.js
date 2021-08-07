const puppeteer = require('puppeteer');
const { getText, getNumber, getLink, getDate, getWorkType } = require('../utils.js')

const site = 'wishket'
const pageUrl = 'https://www.wishket.com/project/?order_by=submit&page=1'
const selector = {
  article: '#resultListWrap > div > div > div',
  title: 'h4',
  price: 'p.estimated-price > span.estimated-data',
  term: 'p.estimated-term > span.estimated-data',
  work_type: 'div.simple-chip',
  project_category: 'p.category',
  project_field: 'p.subcategory',
  details: 'div.project-description',
  created_time: 'div.project-recruit-guide',
  url: 'a'
}

async function getArticle(element) {
  return {
    site: site,
    title: await getText(element, selector.title),
    price: await getNumber(element, selector.price),
    term: await getNumber(element, selector.term),
    work_type: await getWorkType(element, selector.work_type),
    project_category: await getText(element, selector.project_category),
    project_field: await getText(element, selector.project_field),
    details: await getText(element, selector.details),
    created_time: (await getDate(element, selector.created_time)).slice(6, -1),
    url: await getLink(element, selector.url)
  }
}

async function crawl(page) {
  let articles = []
  await page.goto(pageUrl);
  const articleNodes = await page.$$(selector.article);
  for (let articleNode of articleNodes) {
    articles.push(await getArticle(articleNode))
  }
  return articles
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const articles = await crawl(page);
  console.log(articles);
  await browser.close();
})();
