// Regenerates public/sitemap.xml after every build.
//
// lastmod is derived from the newest source file rather than "now", so the date
// reflects an actual content change. Google uses lastmod to prioritise
// re-crawling and ignores changefreq and priority entirely, which is why
// neither appears here.

import { readdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SITE_URL = "https://www.bagombekajob.com";
const CONTENT_DIRS = ["sections", "data", "pages", "components", "styles"];

const newestMtime = async (dir) => {
  let newest = 0;

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    const mtime = entry.isDirectory() ? await newestMtime(path) : (await stat(path)).mtimeMs;

    if (mtime > newest) newest = mtime;
  }

  return newest;
};

const mtimes = await Promise.all(CONTENT_DIRS.map(newestMtime));
const lastmod = new Date(Math.max(...mtimes)).toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`;

await writeFile("public/sitemap.xml", sitemap);
console.log(`sitemap.xml written with lastmod ${lastmod}`);
