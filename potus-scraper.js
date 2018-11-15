const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const wiki = 'https://en.wikipedia.org';
const potusParser = require('./potus-parse');

rp(url)
 .then(function(html){
     // success
     // console.log(html);
     const wikiUrls = [];
     for (let i = 0; i < 45; i++){
         wikiUrls.push($('big > a', html)[i].attribs.href);
     }
     // console.log($('big > a', html).length);
     // console.log($('big > a', html));
     // console.log(wikiUrls);
     return Promise.all(
        wikiUrls.map(function(url) {
            return potusParser(`${wiki}${url}`);
        })   
     )
 })
 .then(function(presidents){
     console.log(presidents);
 })
 .catch(function(err){
     // handle error
     console.error(err);
 })
