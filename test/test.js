import {Builder,Key,By,until} from 'selenium-webdriver'
import {expect} from  "chai";
import {before}  from "mocha";

const url="http://localhost:3000/";
let driver ;
describe("login test  cases",async ()=>{

before(async ()=>{
    driver= await new Builder().forBrowser('chrome').build();  
});
after(async ()=>{
   await driver.quit();
});
it("test1 valid email invalid password",async ()=>{
    await driver.get(url);

    let email = await driver.findElement(By.id(":r3:"));
    await email.sendKeys("hallo@email.com");
    let pass= await  driver.findElement(By.id(":r4:"));
    await pass.sendKeys("123");
    let login = await driver.findElement(By.id(":r5:"))
    await login.click();

let alert = await driver.wait(until.alertIsPresent(),10000);
let alerttext= await alert.getText();
await alert.accept();
   
    expect(alerttext).to.be.eq("Invalid login credentials");
});

it("test2 valid email valid password",async ()=>{
    await driver.get(url);

    let email = await driver.findElement(By.id(":r3:"));
    await email.sendKeys("hallo@email.com");
    let pass= await  driver.findElement(By.id(":r4:"));
    await pass.sendKeys("123456789");
    let login = await driver.findElement(By.id(":r5:"))
    await login.click();
    let loged =await driver.wait(until.elementLocated(By.xpath("//button[@id=':r7:']")),5000);
    let logedtext= await loged.getText();

    expect(logedtext).to.be.eq("LOGOUT");
});

}); 
