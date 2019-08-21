const screenshotTake = require("./takePicture")
const puppeteer = require('puppeteer');
const parser = require("./parser")
exports.forms = async(targetPage) => {
    return new Promise(async(resolve, reject) => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true, defaultViewport:{width:1280,height:800}});
    const page = await browser.newPage();
    await page.setViewport({width: 1280, height: 800});
    await page.goto(targetPage);

    await page.waitForSelector('div[id="root"][style="opacity: 1;"]')
    await screenshotTake.screenshot("01_root.png",page)    
    await page.keyboard.press('Enter');

    await page.waitForSelector('input[placeholder="Type or select an option"]')
    await page.click('input[placeholder="Type or select an option"]')
    const HTML = await page.content()
    const FirstOptionBlock = await parser.parse(HTML,'placeholder="Type or select an option"',"</section>")
    const spanList = await parser.parseAll(FirstOptionBlock,"<span>","</span>")    
    const spanNum = spanList[Math.floor(Math.random()*spanList.length)];
    const spanForClick = await page.$x(`//span[contains(text(), '${spanNum}')]`);
    await spanForClick[0].click();
    await screenshotTake.screenshot("02_select.png",page)

    await page.waitForSelector('section[data-qa-focused="true"][data-js-activable-item="true"]')
    const arr = ["KeyY","KeyN"]
    const KeyOnBoard = arr[Math.floor(Math.random()*arr.length)];
    await page.waitFor(1000)

    await page.keyboard.down(KeyOnBoard,{delay: 1000}); 
    await page.keyboard.up(KeyOnBoard,{delay: 1000});    
    await screenshotTake.screenshot("03_select.png",page)

    await page.waitForSelector('input[placeholder="MM/DD/YYYY"]')
    await page.waitFor(1000)
    const myBirthday = "09031995"
    await page.click('input[placeholder="MM/DD/YYYY"]')     
    await page.type('input[placeholder="MM/DD/YYYY"]', myBirthday,{delay: 120})
    await screenshotTake.screenshot("04_select.png",page)
    await page.keyboard.press('Enter');

    await page.waitForSelector('input[placeholder="Type your email here..."]')

    const email = "njaques517@gmail.com"
    await page.type('input[placeholder="Type your email here..."]', email,{delay: 120})
    await screenshotTake.screenshot("05_select.png",page)
    await page.keyboard.press('Enter');

    await page.waitFor(1000)
    await page.waitForSelector('button[data-qa="submit-button deep-purple-submit-button"]')
    await page.keyboard.press('Enter');

    await page.waitFor(1000)
    await page.waitForSelector('div[data-qa="thank-you-screen-visible deep-purple-thank-you-screen-visible"]')
    await screenshotTake.screenshot("06_select.png",page)
    
    await browser.close();
    resolve("ok")
    });
}