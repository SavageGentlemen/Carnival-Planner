const fs = require('fs');
const cheerio = require('cheerio');

const filePath = 'C:\\\\Users\\\\rift\\\\.gemini\\\\antigravity\\\\brain\\\\42499d11-0d80-45cd-b7f4-a9f51f1944a6\\\\.system_generated\\\\steps\\\\1304\\\\content.md';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const htmlStart = data.indexOf('<!DOCTYPE html>');
    if (htmlStart === -1) {
        console.error('No HTML found');
        return;
    }
    const html = data.substring(htmlStart);

    const $ = cheerio.load(html);
    
    console.log('--- HEADINGS AND TEXT ---');
    $('h1, h2, h3, p, li').each((i, el) => {
        const text = $(el).text().trim();
        if (text.includes('April') || text.includes('Fete') || text.includes('Purchase') || text.includes('purchase')) {
            if (text.length > 5 && text.length < 300) {
                console.log(`${el.name.toUpperCase()}: ${text}`);
            }
        }
    });
});
