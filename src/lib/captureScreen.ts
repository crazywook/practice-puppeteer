import moment from 'moment'
import puppeteer from 'puppeteer'
import path from 'path'

const root = process.cwd()

export async function captureScreen(url: string): Promise<void> {
  if (!url) {
    console.log('launch need url')
    return
  }
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const urlPathname = url.split('://')[1]
  const screenshotPath = path.resolve(root, 'data', 'screenshot')
  const dateStr = moment().format('YYMMDD')
  const filepath = path.resolve(
    root,
    screenshotPath,
    `${urlPathname}_${dateStr}.png`
  )

  await page.goto(`${url}`)
  console.log(`try to capture ${url} to ${filepath}`)
  await page.screenshot({ path: filepath })

  browser.close()
}
