// import { captureScreen } from './lib/captureScreen'
import { crawlGoogleSearchTitle } from './lib/crawlGoogleSearchTitle'

try {
  // captureScreen('https://gmarket.co.kr')
  crawlGoogleSearchTitle('devpools')
} catch (e) {
  console.error(e)
}
