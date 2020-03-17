import { siteLogin } from '../../lib/login'
import dotenv from 'dotenv'
import { coupang } from '../../../config/password/password.json'

dotenv.config({path: '../config'})

async function launch() {
  const {err, page} = await siteLogin(
    coupang,
    {
      headless: false,
      executablePath: process.env.CHROME_PATH
    }
  )

  await page.waitForNavigation()
  const myCoupang = await page.$('#myCoupang')
  if (!myCoupang) {
    throw new Error('selector: #myCoupang - does not exist')
  }
  myCoupang.click()
  // await page.waitForNavigation()
  // const userModify = await page.$('a[href=*userModify*]')
  // if (!userModify) {
  //   throw new Error('userModify does not exist')
  // }
  // userModify.click()

  if (err) {
    console.error(err)
  }
}

launch()
