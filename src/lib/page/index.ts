import puppeteer from 'puppeteer'

export async function createPageEnterModule(
  url: string,
  options: puppeteer.LaunchOptions
): Promise<{
  page: puppeteer.Page,
  browser: puppeteer.Browser
}> {

  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.goto(url)

  return { 
    browser,
    page,
  }
}