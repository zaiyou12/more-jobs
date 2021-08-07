const AWS = require('aws-sdk');
const chromium = require('chrome-aws-lambda');
const ddbDoc = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-2'});

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

async function getText(element, selector) {
  return await element.$eval(selector, el=>el.innerText);
}

async function getNumber(element, selector) {
  const numberInStr = await getText(element, selector)
  return parseInt(numberInStr.slice(0, -1).replace(/\,/g, ''), 10);
}

async function getLink(element, selector) {
  return await element.$eval(selector, el => el.href)
}

async function getDate(element, selector) {
  const dateInStr = await getText(element, selector)
  return dateInStr.slice(6, -1).replace(/\./g, '-')
}

async function getWorkType(element, selector) {
  let workType = await getText(element, selector)
  workType = workType === '외주(도급)'? '도급': workType
  return workType
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
    created_time: await getDate(element, selector.created_time),
    url: await getLink(element, selector.url)
  }
}

async function crawl(page) {
  let articles = []
  await page.goto(pageUrl);
  const articleNodes = await page.$$('#resultListWrap > div > div > div');
  for (let articleNode of articleNodes) {
    articles.push(await getArticle(articleNode))
  }
  return articles
}

exports.handler = async (event, context, callback) => {
  let result = '';
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  const articles = await crawl(page)
  await browser.close();

  const params = {
    RequestItems: {
      'morejobs-articles': articles
    }
  }
  ddbDoc.batchWrite(params, function(err, data){
    if(err){
      result = err
    } else {
      result = 'Added ' + articles.length + ' items to DynamoDB'
    }
    console.log(result)
  })
  return callback(null, articles);
}
