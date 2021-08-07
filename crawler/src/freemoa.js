const AWS = require("aws-sdk");
const chromium = require("chrome-aws-lambda");
const { getText, getNumber, getDate, getWorkType } = require("./utils.js");

/**
 * Update required for each site
 *
 * The code below include all of the crawler's basic structures.
 * You should keep the structure for crawler working properly,
 * you only need to change **site-specific css selectors** and
 * **special logis** for handling exception cases.
 */
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
    PutRequest: {
      Item: {
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
      },
    },
  };
}

/**
 * Do not modify the code below.
 * It is mandatory for crawlers on AWS lambda.
 *
 * The crawler accesses a page, reads all the content of the article,
 * and stores it in AWS dynamodb.
 */
async function crawl(page) {
  let articles = [];
  await page.goto(pageUrl);
  const articleNodes = await page.$$(selector.article);
  for (let articleNode of articleNodes) {
    articles.push(await getArticle(articleNode));
  }
  return articles;
}

const ddbDoc = new AWS.DynamoDB.DocumentClient({ region: "ap-northeast-2" });
exports.handler = async (event, context, callback) => {
  let result = "";
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  const articles = await crawl(page);
  await browser.close();

  const params = {
    RequestItems: {
      "morejobs-articles": articles,
    },
  };
  ddbDoc.batchWrite(params, function (err, data) {
    if (err) {
      result = err;
    } else {
      result = "Added " + articles.length + " items to DynamoDB";
    }
    console.log(result);
  });
  return callback(null, articles);
};
