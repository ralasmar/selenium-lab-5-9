const {Builder, Browser, By, Key, until } = require('selenium-webdriver');

let driver;

beforeEach(async () => {
  driver = new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("testing the movies app", () => {
    test('can delete a movie', async () => {
        //--------------delete movie--------------------
        //navigate to the app
        await driver.get('http://localhost:3000')
        //find the input bar and enter a name
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Encanto')
        //find the add button and click it
        await driver.findElement(By.css('button[type="submit"]')).click()
        //find remove button and click it
        await driver.findElement(By.css('button[class="delete-btn"]')).click()

        //---------------click checkbox----------------------------
        //find the input bar and enter a name to add a movie again
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Moana')
        //find the add button and click it
        await driver.findElement(By.css('button[type="submit"]')).click()
        //find the checkbox by a movie and select it
        await driver.findElement(By.css('input[id="movie-1"]')).click()

        //----------check if message appears when checkbox is selected-----------
        //wait until message appears
        const message = await driver.wait(until.elementLocated(By.css("#message")))
        //check if the message appeared
        expect(await message.getText()).toContain('Watched')
    })
})