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

    //let email  = await driver.findElement(By.xpath("//input[@type='text']"));


let email= await driver.wait(until.elementLocated(By.xpath("//input[@type='text']")), 5000);
let validationMessage = await driver.executeScript("return arguments[0].validationMessage;", email);
console.log(validationMessage);
    await email.sendKeys("hallo@email.com");

   let pass=await driver.findElement(By.xpath("//input[@type='password']"));

    await pass.sendKeys("123456789");
  
    let login = await driver.findElement(By.xpath("//button[@type='submit']"));
    await login.click();
    expect(validationMessage).to.be.eq("Please fill out this field.");
/*
let alert = await driver.wait(until.alertIsPresent(),10000);
let alerttext= await alert.getText();
await alert.accept();
   
    expect(alerttext).to.be.eq("Invalid login credentials");*/
});

it("test2 valid email valid password",async ()=>{
    await driver.get(url);

    //let email  = await driver.findElement(By.xpath("//input[@type='text']"));


let email= await driver.wait(until.elementLocated(By.xpath("//input[@type='text']")), 5000);

    await email.sendKeys("hallo@email.com");

   let pass=await driver.findElement(By.xpath("//input[@type='password']"));

    await pass.sendKeys("123456789");
  
    let login = await driver.findElement(By.xpath("//button[@type='submit']"));
    await login.click();
    let loged = await driver.wait(until.elementLocated(By.xpath('//button[@type="button"]')),5000);
    let logedtext= await loged.getText();
   expect(logedtext).to.be.eq("LOGOUT");
   loged.click();
});

it("test3 empty email",async ()=>{
    await driver.get(url);

    //let email  = await driver.findElement(By.xpath("//input[@type='text']"));


let email= await driver.wait(until.elementLocated(By.xpath("//input[@type='text']")), 5000);
let validationMessage = await driver.executeScript("return arguments[0].validationMessage;", email);

    await email.sendKeys("");

   let pass=await driver.findElement(By.xpath("//input[@type='password']"));

    await pass.sendKeys("12345689");
  
    let login = await driver.findElement(By.xpath("//button[@type='submit']"));
    await login.click();
    expect(validationMessage).to.be.eq("Please fill out this field.");
})
it("test 4 empty pass",async ()=>{
    await driver.get(url);

    //let email  = await driver.findElement(By.xpath("//input[@type='text']"));


let email= await driver.wait(until.elementLocated(By.xpath("//input[@type='text']")), 5000);


    await email.sendKeys("hallo@email.com");

   let pass=await driver.findElement(By.xpath("//input[@type='password']"));
   let validationMessage = await driver.executeScript("return arguments[0].validationMessage;", pass);
    await pass.sendKeys("");
  
    let login = await driver.findElement(By.xpath("//button[@type='submit']"));
    await login.click();
    expect(validationMessage).to.be.eq("Please fill out this field.");
})


}); 
