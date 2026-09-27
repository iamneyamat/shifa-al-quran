const https = require('https');
const fs = require('fs');
const path = require('path');

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadBinary(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadBinary(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function main() {
  const css = await get('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&family=Hind+Siliguri:wght@400;600;700&family=Amiri:wght@400;700&display=swap', {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const fontsDir = path.join(__dirname, '..', 'public', 'fonts');
  if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir, { recursive: true });

  const blocks = css.split('@font-face');
  let count = 0;
  for (const block of blocks) {
    if (!block.includes('font-family')) continue;
    const familyMatch = block.match(/font-family:\s*['"]([^'"]+)['"]/);
    const weightMatch = block.match(/font-weight:\s*(\d+)/);
    const urlMatch = block.match(/url\((https:\/\/[^)]+)\)/);
    const subsetMatch = block.match(/\/\*\s*([^*]+)\s*\*\//);

    if (familyMatch && weightMatch && urlMatch) {
      const family = familyMatch[1].replace(/\s+/g, '');
      const weight = weightMatch[1];
      const url = urlMatch[1];
      const subset = subsetMatch ? subsetMatch[1].trim() : 'all';

      if (subset === 'bengali' || subset === 'arabic' || subset === 'latin' || family.includes('Amiri')) {
        const ext = url.endsWith('.ttf') ? 'ttf' : 'woff2';
        const filename = `${family}-${weight}-${subset}.${ext}`;
        const dest = path.join(fontsDir, filename);
        console.log(`Downloading ${filename} from ${url}...`);
        await downloadBinary(url, dest);
        console.log(`Saved ${filename}, size: ${fs.statSync(dest).size} bytes`);
        count++;
      }
    }
  }
  console.log(`Successfully downloaded ${count} fonts!`);
}

main().catch(console.error);
