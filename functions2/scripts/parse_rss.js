const fs = require('fs');
const cheerio = require('cheerio');

const filePath = 'C:\\Users\\rift\\.gemini\\antigravity\\brain\\42499d11-0d80-45cd-b7f4-a9f51f1944a6\\.system_generated\\steps\\1296\\content.md';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const xmlStart = data.indexOf('<?xml');
    if (xmlStart === -1) {
        console.error('No XML found');
        return;
    }
    const xml = data.substring(xmlStart);

    const $ = cheerio.load(xml, { xmlMode: true });
    const items = [];

    $('item').each((i, el) => {
        const title = $(el).find('title').text();
        const link = $(el).find('link').text();
        const pubDate = $(el).find('pubDate').text();
        const categories = [];
        $(el).find('category').each((j, cat) => {
            categories.push($(cat).text());
        });
        const description = $(el).find('description').text();

        items.push({ title, link, pubDate, categories, description });
    });

    console.log(JSON.stringify(items, null, 2));
});
