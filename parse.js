/* eslint-disable */
const fs = require('fs');
const html = fs.readFileSync('C:/Users/Administrator/.gemini/antigravity-ide/brain/04db8381-4ce2-4223-ad85-d223c395d916/.system_generated/steps/103/content.md', 'utf8');

const results = [];
// More robust regex to optionally capture rqin-des
const regex = /<h2 class="rqin-title">(.*?)<\/h2>[\s\S]*?(?:<div class="rqin-des">.*?<small>(.*?)<\/small>.*?<\/div>)?[\s\S]*?(?:<div class="rqin-extra">(.*?)<\/div>)?[\s\S]*?<a href="(.*?)"[^>]*>ডাউনলোড<\/a>/g;

let match;
while ((match = regex.exec(html)) !== null) {
  const item = {
    title: match[1].replace(/^[০-৯]+।\s*/, '').trim(),
    url: match[4]
  };
  if (match[2]) item.description = match[2].trim();
  if (match[3]) item.size = match[3].replace('সাইজ:', '').trim();
  
  results.push(item);
}

console.log(JSON.stringify(results, null, 2));
