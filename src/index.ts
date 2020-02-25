import moment from 'moment'
import puppeteer from 'puppeteer'
import path from 'path'

async function crawlGoogleSearchTitle(url: string): Promise<void> {
  const browser = await puppeteer.launch()

  try {
  } finally {
    browser.close()
  }
}

if (process.env.URL) {
  crawlGoogleSearchTitle(process.env.URL)
} else {
  console.log('no url')
}
