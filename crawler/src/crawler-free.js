const AWS = require('aws-sdk');
const chromium = require('chrome-aws-lambda');
const ddbDoc = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-2'});

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
  await page.goto('https://www.freemoa.net/m4/s41?page=1');
  const articles = await page.$$eval('#projectListNew > li', (elements) =>
    elements.map((element) => {
      return {
        PutRequest: {
          Item: {
            site: 'freemoa',
            title: element.querySelector('p.title').innerText,
            price: parseInt(element.querySelector('div:nth-child(3) > p:nth-child(1) > b').innerText.slice(0, -3).replace(/\,/g, ''), 10) * 10000,
            term: parseInt(element.querySelector('div:nth-child(3) > p:nth-child(2) > b').innerText.slice(0, -1).replace(/\,/g, ''), 10),
            work_type: element.querySelector('div:nth-child(1) > div:nth-child(2) > p').innerText,
            project_category: element.querySelectorAll('div:nth-child(2)')[1].querySelector('div').innerText,
            details: element.querySelector('div:nth-child(4) > div:nth-child(1)').innerText,
            created_time: element.querySelector('b.date').innerText.replaceAll('.', '-'),
          }
        }
      }
    })
  );
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
