// eslint-disable-next-line no-unused-vars
import puppeteer, { Page, ElementHandle } from 'puppeteer'
// import puppeteer from 'puppeteer'
import { createPageEnterModule } from '../page'

interface LoginRequiredElement {
  loginBtnElement: ElementHandle<HTMLButtonElement>,
  idInputElement: ElementHandle<HTMLInputElement>,
  passwordInputElement: ElementHandle<HTMLInputElement>,
  submitBtnElement: ElementHandle<HTMLButtonElement>,
}

export type ConnectionInfo = {
  entryUrl: string
  loginUrl?: string
  id: string
  password: string,
  // requiredElement: LoginRequiredElement,
}

function redirectionPender(page: Page, pageUrl: string) {
  
  return new Promise((resolve) => {
    page.on('request', request => {
      console.log('request url', request.url())
      console.log('indeof', request.url().indexOf(pageUrl))
      if (request.url().indexOf('http://localhost:8082/#/login') !== -1) {
        resolve()
      }
      
      console.log('request frame', request.frame())
    })
    page.on('response', response => {
      console.log('response url', response.url())
      // console.log('response', response)
    })
  })
}

function getLoginBtnElement(page: Page): Promise<ElementHandle<HTMLButtonElement> | null> {
  return page.$('label')
}

export async function createLoginRequiredElement(page: Page): Promise<LoginRequiredElement> {

  const [
    loginBtnElement,
    idInputElement,
    passwordInputElement,
    submitBtnElement,
  ] = await Promise.all([
    getLoginBtnElement(page),
    page.$('input[name=id]') as Promise<ElementHandle<HTMLInputElement> | null>,
    page.$('input[id=id]') as Promise<ElementHandle<HTMLInputElement> | null>,
    page.$('input[id=id]') as Promise<ElementHandle<HTMLButtonElement> | null>
  ])

  if (!loginBtnElement) {
    throw new Error('loginBtnElement does not exist')
  }
  if (!idInputElement) {
    throw new Error('idInputElement does not exist')
  }
  if (!passwordInputElement) {
    throw new Error('passwordInputElement does not exist')
  }
  if (!submitBtnElement) {
    throw new Error('submitBtnElement does not exist')
  }
    
  return {
    loginBtnElement,
    idInputElement,
    passwordInputElement,
    submitBtnElement,
  }
}

export async function siteLogin(
  {
    entryUrl,
    id,
    password,
  }: ConnectionInfo,
  options: puppeteer.LaunchOptions
): Promise<{ err?: Error, browser: puppeteer.Browser, page: puppeteer.Page }> {

  const { browser, page } = await createPageEnterModule(entryUrl, options)
  const loginPageUrl = 'http://localhost:8082/#/login'
  
  try {
    const url = page.url()
    console.log('url', url)
    if (url.indexOf(loginPageUrl)) {

      const result = await redirectionPender(page, loginPageUrl)
        .catch(e => new Error(e))
      console.log('result', result)
      if (result instanceof Error) {
        return { page, browser }
      }
    }
    console.log('correct url')
    const {
      loginBtnElement,
      idInputElement,
      passwordInputElement,
      submitBtnElement,
    } = await createLoginRequiredElement(page)

    if (loginBtnElement) {
      loginBtnElement.click()
    }
    await idInputElement.type(id)
    await passwordInputElement.type(password)

    submitBtnElement.click()
    
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
