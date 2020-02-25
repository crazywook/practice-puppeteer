import moment from 'moment'
import puppeteer from 'puppeteer'

export async function crawlGoogleSearchTitle(url: string): Promise<void> {
  const browser = await puppeteer.launch()

  try {
    const page = await browser.newPage()
    const urlPathname = url.split('://')[1]
    const dateStr = moment().format('YYMMDD')
    await page.goto('https://google.com', { waitUntil: 'networkidle0' })
    await page.type('input', 'devpools')
    // const btn = await page.sel('input[type="submit"]')
    // console.log('btn', btn)
    await page.click('input[type="submit"]')
    console.log('click!')
    await page.waitForSelector('h3 a')

    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('h3 a'))
      console.log({ anchors })
      return anchors.map(anchor => anchor.textContent)
    })

    console.log(links.join('\n'))
  } finally {
    browser.close()
  }
}
