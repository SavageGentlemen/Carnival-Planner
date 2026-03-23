const fetch = require('node-fetch');

async function test() {
  const url = 'https://linktr.ee/ohzeenjm';
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Length:', text.length);
    if (text.length < 1000) {
      console.log('Body:', text);
    } else {
        const titleMatch = text.match(/<title>(.*?)<\/title>/);
        console.log('Title:', titleMatch ? titleMatch[1] : 'No title found');
        
        // Try finding links
        const links = [...text.matchAll(/href="(https:\/\/[^"]+)"/g)].slice(0, 10);
        console.log('Some links:', links.map(l => l[1]));
    }
  } catch (e) {
    console.error(e);
  }
}
test();
