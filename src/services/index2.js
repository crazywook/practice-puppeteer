const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://example.com')

  const textContent = await page.evaluate(() => document.querySelector('p').textContent)
  const innerText = await page.evaluate(() => document.querySelector('p').innerText)

  console.log(textContent)
  console.log(innerText)

  browser.close()
})()