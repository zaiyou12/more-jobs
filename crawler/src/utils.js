async function getText(element, selector) {
  return await element.$eval(selector, el=>el.innerText);
}

async function getNumber(element, selector) {
  const numberInStr = await getText(element, selector)
  return parseInt(numberInStr.slice(0, -1).replace(/\,/g, ''), 10) || 0;
}

async function getLink(element, selector) {
  return await element.$eval(selector, el => el.href)
}

async function getDate(element, selector) {
  const dateInStr = await getText(element, selector)
  return dateInStr.replace(/\./g, '-')
}

async function getWorkType(element, selector) {
  let workType = await getText(element, selector)
  workType = workType === '외주(도급)'? '도급': workType
  return workType
}

exports.getText = getText
exports.getNumber = getNumber
exports.getLink = getLink
exports.getDate = getDate
exports.getWorkType = getWorkType
