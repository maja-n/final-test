'use strict';

const {Builder, By, until, Key} = require('selenium-webdriver');
const chai = require('chai');
const expect= chai.expect;
const chrome = require('selenium-webdriver/chrome');

describe('QA Fast Food Tests', function() {
    let driver;

    before(async function() {
        let service = new chrome.ServiceBuilder('C:\\Users\\Korisnik\\Kurs\\Chrome Driver\\chromedriver.exe').build()
        chrome.setDefaultService(service);

        driver = await new Builder().forBrowser('chrome').build();
    });

    after(function() {
        return driver.quit();
    });

    it('Opens test.qa.rs homepage', async function() {
        await driver.get('http://test.qa.rs/');

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/');
    });

    /*it('Opens Register page', async function() {
        const registerBttn= await driver.findElement(By.linkText('Register'));
        await registerBttn.click();

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/register');
    });

    it('Registers a new user and submits', async function() {
        const fillFirstName='Jerry';
        const fillLastName='Seinfeld';
        const fillEmail='jerry.seinfeld@smth.com';
        const fillUsername='jerrys'
        const fillPassword='12345';

        const firstName=await driver.findElement(By.name('firstname'));
        firstName.sendKeys(fillFirstName);

        const lastName=await driver.findElement(By.name('lastname'));
        lastName.sendKeys(fillLastName);
        
        const email= await driver.findElement(By.name('email'));
        email.sendKeys(fillEmail);

        const username=await driver.findElement(By.name('username'));
        username.sendKeys(fillUsername);

        const password=await driver.findElement(By.id('password'));
        password.sendKeys(fillPassword);

        const confirmPass=await driver.findElement(By.id('passwordAgain'));
        confirmPass.sendKeys(fillPassword);  

        const register= await driver.findElement(By.name('register'));
        await register.click();

        expect(await driver.findElement
            (By.xpath('//div[@role="alert"]')).getText()).to.contain('Success!'
            );

    }); */

    it('Opens login page and performs login', async function() {
        const loginPageBttn= await driver.findElement(By.linkText('Login'));
        await loginPageBttn.click();

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/login');

        const fillUsername='jerrys'
        const fillPassword='12345'

        const loginUsername=await driver.findElement(By.name('username'));
        loginUsername.sendKeys(fillUsername);

        const loginPassword=await driver.findElement(By.name('password'));
        loginPassword.sendKeys(fillPassword);

        const loginBttn=await driver.findElement(By.name('login'));
        await loginBttn.click();

        expect(await driver.findElement
            (By.css('h2')).getText()).to.contain('Welcome back');

    });

     it('Adds items to the cart', async function() {
        const menuBurger = await driver.findElement
        (By.xpath('//div//h3[contains(text(), "Burger")]//ancestor::div[contains(@class, "panel")]'));

        const orderBttnBurger= await menuBurger.findElement(By.xpath('//div[@class="panel panel-danger"]//input[@type="submit"]'));
        await orderBttnBurger.click();


        const contShopping1= await driver.findElement(By.partialLinkText('Continue'));
        await contShopping1.click();

        const menuDouble = await driver.findElement(By.xpath('//div//h3[contains(text(), "Double")]//ancestor::div[contains(@class, "panel")]'));
        const orderBttnDouble= await menuDouble.findElement(By.xpath('//div[@class="panel panel-warning"]//input[@type="submit"]'));
        await orderBttnDouble.click();


        const contShopping2= await driver.findElement(By.partialLinkText('Continue'));
        await contShopping2.click();


        const menuAttack= await driver.findElement(By.xpath('//div//h3[contains(text(), "Heart")]//ancestor::div[contains(@class, "panel")]'));
        const orderBttnHeart= await menuAttack.findElement(By.xpath('//div[@class="panel panel-success"]//input[@type="submit"]'));
        await orderBttnHeart.click();

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/order');

        const orderTable = await driver.findElement(By.css('table'));
        const orderRow = await orderTable.findElement(
            By.xpath('//table//td[contains(., "with")]/parent::tr')
        );
        const orderQty = await orderRow.findElement(By.xpath('//td[2]'))
        const orderPriceBurger = await orderRow.findElement(By.xpath('//tr[1]/td[3]'));
        const orderPriceDouble = await orderRow.findElement(By.xpath('//tr[2]/td[3]'));
        const orderPriceHeart = await orderRow.findElement(By.xpath('//tr[3]/td[3]'));
        const itemTotal = await orderRow.findElement(By.xpath('//td[4]'));
        const orderTotal= await orderRow.findElement(By.xpath('//td[contains(., "Total:")]'));

        const priceBurger = Number((await orderPriceBurger.getText()).substring(1));
        const priceDouble= Number((await orderPriceDouble.getText()).substring(1));
        const priceHeart= Number((await orderPriceHeart.getText()).substring(1));
        const total = Number((await orderTotal.getText()).substring(1));
        const qntty = Number(await orderQty.getText());

        const calculatedTotal = qntty * (priceBurger + priceDouble + priceHeart);

        expect(calculatedTotal).to.be.eq(total);


        const checkoutBttn= await driver.findElement(By.name('checkout'));
        checkoutBttn.click();


    }); 

    it('Log out', async function() {
        const logoutBttn= await driver.findElement(By.partialLinkText('Logout'));
        await logoutBttn.click();

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/');

    });

});    