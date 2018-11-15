const fs = require('fs');
const axios = require('axios');
const $ = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/';
const cat = 'Category:'
const keyword = process.argv[2];

const list = [];

const getPage = title => {
    return axios.get(`${url}${title}`)
        .then(r => {
            return $('.mw-parser-output p', r.data).first().text();
        })
        .catch(err => {
            console.error(err);
            return null;
        })
}

const getCategory = term => {
    return axios.get(`${url}${cat}${term}`)
    .then(r => {
        const items = $('#mw-pages .mw-category li a', r.data);
        for (let i = 0; i < items.length; i++){
            list.push(items[i]);
        }
        return Promise.all(
            list.map(e => {
                return getPage(e.attribs.href.slice(6));
            })
        )
    })
    .then(e => {
        console.log(e);
    })
    .catch(err => {
        console.error(err);
    })

}

getCategory(keyword);
