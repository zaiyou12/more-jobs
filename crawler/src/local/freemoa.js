const puppeteer = require("puppeteer");
const {
  getText,
  getNumber,
  getDate,
  getWorkType,
} = require("../utils.js");

const site = "freemoa";
const pageUrl = "https://www.freemoa.net/m4/s41?page=1";
const selector = {
  article: "#projectListNew > li",
  title: "p.title",
  price: "div:nth-child(3) > p:nth-child(1) > b",
  term: "div:nth-child(3) > p:nth-child(2) > b",
  work_type: "div:nth-child(1) > div:nth-child(2) > p",
  project_category: "div:nth-child(2)",
  details: "div:nth-child(4) > div:nth-child(1)",
  created_time: "b.date",
};

async function getProjectCategory(element, selector) {
  const possibleElements = await element.$$(selector);
  return await getText(possibleElements[1], "div");
}

async function getArticle(element) {
  return {
    site: site,
    title: await getText(element, selector.title),
    price: (await getNumber(element, selector.price)) * 10000,
    term: await getNumber(element, selector.term),
    work_type: await getWorkType(element, selector.work_type),
    project_category: await getProjectCategory(
      element,
      selector.project_category
    ),
    details: await getText(element, selector.details),
    created_time: await getDate(element, selector.created_time),
  };
}

async function crawl(page) {
  let articles = [];
  await page.goto(pageUrl);
  const articleNodes = await page.$$(selector.article);
  for (let articleNode of articleNodes) {
    articles.push(await getArticle(articleNode));
  }
  return articles;
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const articles = await crawl(page);
  console.log(articles);
  await browser.close();
})();
