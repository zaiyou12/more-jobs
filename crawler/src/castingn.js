const AWS = require("aws-sdk");
const chromium = require("chrome-aws-lambda");
const { getText, getNumber, getDate, getLink } = require("./utils.js");

/**
 * Update required for each site
 *
 * The code below include all of the crawler's basic structures.
 * You should keep the structure for crawler working properly,
 * you only need to change **site-specific css selectors** and
 * **special logis** for handling exception cases.
 */
const site = "castingn";
const pageUrl = "https://www.castingn.com/projectList";
const selector = {
  article: "#project_list_area > div.request_list_card",
  title: "p.request_title",
  price: "div.request_list_item01 > ul > li > p.request_info_val",
  project_field: "div.request_list_item01 > p.label_badge > span.label_val",
  details: "div.request_list_item01 > p.reqeust_desc",
  end_time:
    "div.request_list_item01 > ul > li:nth-child(2) > p.request_info_val > span",
  url: "div.request_list_item01 > p.request_title > a",
  condition: "div.request_list_item01 > p.label_badge > span.label_key",
};

async function getArticle(element) {
  /**
   * About magic number 14 in created_time
   *   We don't know the registration time unless using their REST api,
   *   so I subtract 14 from the end_date.
   *
   *   At this point, their rest api has many vulnerabilities
   *   that you can get created_time easily, if you want.
   *   (I'm not sure if it violates the crawler)
   */
  const endTime = new Date(await getDate(element, selector.end_time));
  endTime.setDate(endTime.getDate() - 14);
  return {
    PutRequest: {
      Item: {
        site: site,
        title: await getText(element, selector.title),
        price: await getNumber(element, selector.price),
        work_type: "도급",
        project_field: await getText(element, selector.project_field),
        details: await getText(element, selector.details),
        created_time:
          endTime.getFullYear() +
          "-" +
          ("0" + (endTime.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + endTime.getDate()).slice(-2),
        url: await getLink(element, selector.url),
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
    const condition = await getText(articleNode, selector.condition);
    if (condition === "IT") {
      articles.push(await getArticle(articleNode));
    }
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
