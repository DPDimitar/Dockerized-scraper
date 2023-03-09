import * as cheerio from 'cheerio';
import {Client, Query} from "ts-postgres";
import {Page} from "puppeteer";

const puppeteer = require('puppeteer');
const client = new Client({"host": "database", "user": "admin", "password": "admin1234", "database": "mydb"})


async function main() {

    await client.connect()
    try {
        console.log("Client connected")
        const query1 = new Query("DROP TABLE IF EXISTS properties")
        const query2 = new Query("CREATE TABLE IF NOT EXISTS properties ( id SERIAL PRIMARY KEY, title VARCHAR(255), location VARCHAR(255), price VARCHAR(255), img VARCHAR(255) )")
        await client.execute(query1)
        await client.execute(query2)
    } catch (error) {
        console.log(error)
        return
    }

    let counter: number = 0

    try {
        const browser = await puppeteer.launch({
            headless: true, executablePath: '/usr/bin/chromium-browser', args: [
                '--no-sandbox',
                '--disable-gpu'
            ]
        });
        const page = await browser.newPage();
        await page.goto('https://www.sreality.cz/en/search/for-sale/apartments');

        await readAllPropertiesPages(page, counter)

        await browser.close();
    } catch (error) {
        console.error(error);
        return
    }

    await client.end()

}

async function insertResults(results: object[]) {
    results.forEach(function (obj) {
        try {
            // @ts-ignore
            client.query("INSERT INTO properties(title, location, price, img) VALUES ('" + obj.title + "', '" + obj.location + "', '" + obj.price + "', '" + obj.img + "')")
        } catch (error) {
            console.log(error)
        }
    })
}

async function readAllPropertiesPages(page: Page, counter: number) {

    let results: object[] = []
    let obj = {}

    while (counter < 500) {

        const html: string = await page.content()

        const $ = cheerio.load(html)

        const $property_list = $('div.property-list .content .dir-property-list').children('div.property')

        await $property_list.each(function () {
            obj = {
                title: ($(this).find("div.info div.text-wrap").find('a.title').text().trim()),
                location: ($(this).find("div.info div.text-wrap").find('span.locality').text().trim()),
                price: ($(this).find("div.info div.text-wrap").find('span.price').text().trim()),
                img: ($(this).find("div div a:first-child").find('img').attr('src'))
            };
            results.push(obj)
        })

        await insertResults(results)

        await page.waitForSelector('div.paging li.paging-item a.paging-next')

        counter += 20

        console.log(counter)

        results = []
        obj = {}

        await page.goto('https://www.sreality.cz' + $('div.paging li.paging-item a.paging-next').attr('href'))

        await page.waitForSelector('div.paging li.paging-item a.paging-next')

    }

}

export default main()