// eslint-disable-next-line no-unused-vars
import puppeteer from 'puppeteer'
import { createPageEnterModule } from '../page'

type ConnectionInfo = {
  entryUrl: string
  loginUrl?: string
  id: string
  password: string
}

export async function siteLogin(
  {
    entryUrl,
    id,
    password
  }: ConnectionInfo,
  options: puppeteer.LaunchOptions
): Promise<{ err?: Error, browser: puppeteer.Browser, page: puppeteer.Page }> {

  const { browser, page } = await createPageEnterModule(entryUrl, options)

  try {

    const LOGIN_BTN_SELECTOR = '#login'
    const loginLink = await page.$(LOGIN_BTN_SELECTOR)
    if (!loginLink) {
      throw new Error(`login button(${LOGIN_BTN_SELECTOR}) does not exist`)
    }

    loginLink.click()

    await page.waitForNavigation()

    const ID_INPUT_SELECTOR = '#login-email-input'
    const PASSWORD_INPUT_SELECTOR = '#login-password-input'
    const SUBMIT_BTN_SELECTOR = 'button[type=submit]'
    const [
      idInput,
      pwInput,
      submit
    ] = await Promise.all([
      page.$(ID_INPUT_SELECTOR),
      page.$(PASSWORD_INPUT_SELECTOR),
      page.$(SUBMIT_BTN_SELECTOR),
    ])
    
    if (!idInput) {
      return {
        err: new Error(`id input does not exist, selector: ${ID_INPUT_SELECTOR}`),
        browser,
        page
      }
    }
    if (!pwInput) {
      return {
        err: new Error(`id input does not exist, selector: ${PASSWORD_INPUT_SELECTOR}`),
        browser,
        page
      }
    }
    if (!submit) {
      return {
        err: new Error(`id input does not exist, selector: ${SUBMIT_BTN_SELECTOR}`),
        browser,
        page
      }
    }
    await idInput.type(id)
    await pwInput.type(password)

    submit.click()
    
  } catch (e) {
    console.error(e)
    return {
      err: e,
      browser,
      page
    }
  }
  return {
    browser,
    page
  }
}
