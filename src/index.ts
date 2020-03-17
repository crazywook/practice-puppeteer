import puppeteer from 'puppeteer'

(async() => {
//브라우저 객체와 페이지 객체를 만들고
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // 구글 검색창 방문
  await page.goto('https://google.com', {waitUntil: 'networkidle0'})
  //개발 바보들에 대한 검색어를 입력하고
  await page.type('input', 'devpools')
  // 검색버튼을 누르고
  await page.click('input[type="submit"]')
  //검색한 결과의 타이틀을 가져와서
  // Wait for the results to show up
  await page.waitForSelector('h3 a')
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('h3 a'))
    return anchors.map(anchor => anchor.textContent)
  })
  //콘솔에 출력한다.
  console.log(links.join('\n'))
  browser.close()
})()
