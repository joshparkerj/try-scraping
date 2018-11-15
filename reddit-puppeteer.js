const puppeteer = require('puppeteer');
const url = 'https://www.reddit.com';

const b = [];

puppeteer
    .launch()
    .then(function(browser){
        b.push(browser);
        return browser.newPage();
    })
    .then(function(page){
        return page.goto(url).then(function(){
            return page.content();
        })
    })
    .then(function(html){
        console.log(html);
        b[0].close();
    })
    .catch(function(err){
        // handle error
        console.error(err);
    })
