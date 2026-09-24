// Run with NODE_PATH pointing to an installed sharp and FFMPEG to ffmpeg.
const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');
const sharp = require('sharp');
const ffmpeg = process.env.FFMPEG;
const out = 'public/media';
fs.mkdirSync(out, {recursive:true});
async function images(input, name) {
  for (const width of [480,768,1280,1920]) await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:76}).toFile(`${out}/${name}-${width}.webp`);
}
async function main() {
  execFileSync(ffmpeg,['-y','-i','public/videos/fokal-postcards.m4v','-frames:v','1',`${out}/poster.png`],{stdio:'ignore'});
  await images(`${out}/poster.png`,'home');
  fs.unlinkSync(`${out}/poster.png`);
  for (const [size,width] of [['mobile',640],['desktop',1280]]) execFileSync(ffmpeg,['-y','-i','public/videos/fokal-postcards.m4v','-t','18','-an','-vf',`scale=${width}:-2,fps=24`,'-c:v','libx264','-preset','fast','-crf','29','-pix_fmt','yuv420p','-movflags','+faststart',`${out}/home-${size}.mp4`],{stdio:'ignore'});
  const source=fs.readFileSync('src/pages/SitePages.tsx','utf8');
  const urls=[...new Set(source.match(/https:\/\/[^'"\s]+\.(?:jpg|jpeg|png)(?:\?[^'"\s]+)?/gi)||[])];
  const manifest={};
  for (let i=0;i<urls.length;i++) {
    const url=urls[i];
    try {
      if(fs.existsSync(`${out}/image-${i}-1920.webp`)){manifest[url]=`image-${i}`;continue;}
      const response=await fetch(url, {signal:AbortSignal.timeout(15000)});
      if (!response.ok) continue;
      const buffer=Buffer.from(await response.arrayBuffer());
      await images(buffer,`image-${i}`);
      manifest[url]=`image-${i}`;
    } catch { console.log(`Skipped image ${i}`); }
  }
  for(const filename of fs.readdirSync('public/images')) {
    const name=`local-${path.parse(filename).name}`;
    try { await images(`public/images/${filename}`,name); manifest[`/images/${filename}`]=name; } catch { console.log(`Skipped ${filename}`); }
  }
  fs.writeFileSync('src/lib/optimized-media.json',JSON.stringify(manifest,null,2));
  console.log(`Optimized ${Object.keys(manifest).length} images and home video.`);
}
main().catch(e=>{console.error(e);process.exit(1)});
