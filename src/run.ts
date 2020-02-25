import { captureScreen } from './lib/captureScreen'
import { crawlGoogleSearchTitle } from './lib/crawlGoogleSearchTitle'

try {
  // captureScreen('https://google.com')
  crawlGoogleSearchTitle('devpools')
} catch (e) {
  console.error(e)
}
