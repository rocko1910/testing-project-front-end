import {Builder,Key,By,until} from 'selenium-webdriver'
import {expect} from  "chai";
import {before}  from "mocha";

const url="http://localhost:3000/";
let driver ;
describe("suite1",async ()=>{

before(async ()=>{
    driver= await new Builder().forBrowser('chrome').build();  
});
after(async ()=>{
   await driver.quit();
});
it("test1",async ()=>{
    await driver.get(url);
});

}); 
