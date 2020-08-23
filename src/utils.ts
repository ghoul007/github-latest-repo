import os from 'os';

import puppeteer from 'puppeteer';


export default class Util {

    public static async retrieveRepos(search: string) {
        const browser = await puppeteer.launch({ args: os.platform() !== 'win32' ? ['--no-sandbox', '--disable-setuid-sandbox'] : [] });
        const page = await browser.newPage();

        const response = await page.goto(`https://github.com/search?o=desc&q=${search}&s=updated&type=Repositories`);

        if (response === null || !response.ok()) {
            throw new Error(`Request failed with status code: ${response !== null ? response.status() : null}`);
        }

        const repos: any[] = [];

        // Select repos from GitHub
        const rawRepos = await page.evaluate(() => {

            const data: any[] = [];
            const list = document.querySelectorAll('.codesearch-results > div > ul > li > div.mt-n1')
            return [...list]
                .map(e => ({
                    desc: e.querySelector('P')?.textContent.trim(),
                    title: e.querySelector('div.f4.text-normal > a')?.textContent.trim()
                }))
        });


        await page.close();
        await browser.close();

        return rawRepos;
    }
}
