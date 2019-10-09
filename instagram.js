const puppeteer = require('puppeteer'); 

const BASE_URL = 'https://www.instagram.com/';
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;


const instagram = {
    browser: null,
    page: null,

    initialize: async ()=>{

        instagram.browser = await puppeteer.launch({
            headless: false
        });   

        instagram.page = await instagram.browser.newPage(); 

    },

    login: async (username, password) =>{
        await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2'});

        let loginButton = await instagram.page.$x('//a[contains(text(), "Connectez-vous")]');

        await loginButton[0].click();

        //await instagram.page.waitForNavigation({ waitUntil: 'networkidle2'});
        await instagram.page.waitFor(1000);

        await instagram.page.type('input[name="username"]', username, {delay: 50});
        await instagram.page.type('input[name="password"]', password, {delay: 50});

        await instagram.page.click('button[type="submit"]');
        

    },

    like: async (tags = []) => {
        for (let tag of tags){
            try {

                await instagram.page.goto(TAG_URL(tag), {waitUntil:'networkidle2'});
                await instagram.page.waitFor(1000);
        
                let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');
                
                for (let i=0 ;i <3 ; i++){
                    let post = posts[i];
                    await post.click();
    
                    await instagram.page.waitFor('#react-root');
                    await instagram.page.waitFor(2000);
                    let likable = await instagram.page.$('span[aria-label="J’aime"]');
                    
                    if(likable){
                        await instagram.page.click('span[aria-label="J’aime"]');
                    }
                    await page.waitFor(3000);
                    console.log(0);
                    let closeModalButton =  await page.click('//button[contains(text(), "Fermer")]');
                    console.log();
                    await closeModalButton[0].click();
                    await page.waitFor(1000);
                }
                await page.waitFor(16000);
            }
            catch(e) {
                console.log("------------------------------------------------------------");
                console.log("error : " . e);
                
                console.log("------------------------------------------------------------");
                
            }
            
        }
    }
}

module.exports = instagram;