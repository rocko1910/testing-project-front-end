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


    await email.sendKeys("hallo@email.com");

   let pass=await driver.findElement(By.xpath("//input[@type='password']"));

    await pass.sendKeys("mido");
  
    let login = await driver.findElement(By.xpath("//button[@type='submit']"));
    await login.click();
    

let alert = await driver.wait(until.alertIsPresent(),10000);
let alerttext= await alert.getText();
await alert.accept();
   
    expect(alerttext).to.be.eq("Invalid login credentials");
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

it("test 5  email and pass exist in db but mismatch ",async ()=>{
    await driver.get(url);

    //let email  = await driver.findElement(By.xpath("//input[@type='text']"));


let email= await driver.wait(until.elementLocated(By.xpath("//input[@type='text']")), 5000);


    await email.sendKeys("hallo@email.com");

   let pass=await driver.findElement(By.xpath("//input[@type='password']"));
   
    await pass.sendKeys("ahmed123456");
  
    let login = await driver.findElement(By.xpath("//button[@type='submit']"));
    await login.click();
    let alert = await driver.wait(until.alertIsPresent(),10000);
let alerttext= await alert.getText();
await alert.accept();
   
    expect(alerttext).to.be.eq("Invalid login credentials");
    

})


}); 

describe("register test cases",async () => {
    before(async ()=>{
        driver= await new Builder().forBrowser('chrome').build();  
    });
    after(async ()=>{
       await driver.quit();
    });

    it("test 1 invalid username 1 other inputs are valid boundary analysis",async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("mi");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("mido@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("midopassword");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("midopassword");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.be.eql("Username field must be at least 3 characters")  
    })
    
   
    it("test 2 valid user 3 chars while password is  invalid", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("mid");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("mido@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("mido");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("midopassword");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.not.eql("Username field must be at least 3 characters")  
    });
    it("test 3 valid user 4 chars while password is  invalid", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("mido");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("mido@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("mido");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("midopassword");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.not.eql("Username field must be at least 3 characters")  
    });

    it("test 4 valid empty user", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("mido@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("mido");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("midopassword");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.be.eql("Username field is required!")  
    });
    it("test 5 invalid password 7 chars", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("momo74");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("momo@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("1234567");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("1234567");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.be.eql("Password must be at least 8 characters long!")  
    });
    it("test 6 valid password 8 chars invalid confirm", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("momo66");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("momo@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("12345678");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("1234567");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.not.eql("Password must be at least 8 characters long!")  
    });
    it("test 7 valid password 9 chars invalid confirm", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("momo98");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("momo@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("123456789");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("1234567");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.not.eql("Password must be at least 8 characters long!")  
    });
    it("test 8 invalid password 2 numbers", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("momo455");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("momo@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("ahnljasdhhj12");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("ahnljasdhhj12");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.be.eql("Password must have at least 3 numbers")  
    });
    it("test 9 valid password 3 numbers mismatch  confirmpassword", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("momoto");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("momo@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("ahnljasdhhj123");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("ahnljasdhhj12");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.not.eql("Password must have at least 3 numbers")  
    });
    it("test 10 valid password 4 numbers mismatch  confirmpassword", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("mompaso");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("momo@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("ahnljasdhhj123");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("ahnljasdhhj12");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.not.eql("Password must have at least 3 numbers")  
    });
    it("test 11 empty password", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("miiii");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("mimi@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("asdhka45454");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.be.eql("Password field is required!")  
    });
    it("test 12 empty confirm password", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("miiii");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("mimi@gmail.com");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("asdhka45454");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
        let errMsgText= await errMsg.getText();
        expect(errMsgText).to.be.eql("Passwords don't match!")  
    });

    it("test 13 empty email", async () => {
        await driver.get(url+"register");
        let username=await driver.wait(until.elementLocated(By.xpath("//input[@id='username']")))
        await username.sendKeys("miiii");
        let email= await driver.findElement(By.xpath("//input[@id='email']"));
        await email.sendKeys("");
        let password= await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("ahaha1999");
        let confirmPassword= await driver.findElement(By.xpath("//input[@id='confirmPassword']"));
        await confirmPassword.sendKeys("ahaha1999");  
        let registerButton=await driver.findElement(By.xpath("//button[@type='submit']"));
        await registerButton.click();
        let errMsgText;
        
            let errMsg= await driver.wait(until.elementLocated(By.className("error-banner")),5000);
             errMsgText= await errMsg.getText();
            
        
         

        expect(errMsgText).to.be.eql("Email field is required!")  
    });

    




    
    
})
