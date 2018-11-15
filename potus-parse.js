const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/George_Washington';

const potusParse = function(url){
    return rp(url)
        .then(function(html){
            return {
                name: $('.firstHeading', html).text(),
                birthday: $('.bday', html).text()
            };
        })
        .catch(function(err){
            console.error(err);
        })
}

module.exports = potusParse;
