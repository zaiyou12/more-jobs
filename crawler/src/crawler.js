const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context, callback) => {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto('https://www.wishket.com/project/?order_by=submit&page=1');
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
  return callback(null, articles);
}
