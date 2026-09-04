// Regenerates public/sitemap.xml after every build.
//
// Routes are discovered by walking pages/ rather than being listed by hand. The
// hand-written version silently omitted /how-i-work-remotely for as long as that
// page existed; discovery means a new page is in the sitemap the moment it ships.
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

// Everything indexable under pages/, as URL paths. Excluded: _app/_document and
// other framework files, the noindex 404, API routes, and dynamic segments —
// a [slug] is a template, not an address, so it cannot be listed without knowing
// its params.
const routes = async (dir = "pages", prefix = "") => {
  const found = [];

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const { name } = entry;

    if (name.startsWith("_") || name.startsWith(".") || name.startsWith("[")) continue;

    if (entry.isDirectory()) {
      if (name === "api") continue;

      found.push(...(await routes(join(dir, name), `${prefix}/${name}`)));
      continue;
    }

    if (!/\.(tsx|jsx|ts|js)$/.test(name)) continue;

    const base = name.replace(/\.(tsx|jsx|ts|js)$/, "");

    if (base === "404" || base === "500") continue;

    found.push(base === "index" ? prefix : `${prefix}/${base}`);
  }

  return found;
};

const mtimes = await Promise.all(CONTENT_DIRS.map(newestMtime));
const lastmod = new Date(Math.max(...mtimes)).toISOString().split("T")[0];

// Sorted so the homepage ("") leads and the file does not churn between builds.
const paths = (await routes()).sort();

// No trailing slash, matching the canonical tags exactly. The two disagreeing is
// a self-inflicted duplicate-URL signal.
const entries = paths
  .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

await writeFile("public/sitemap.xml", sitemap);
console.log(`sitemap.xml written with lastmod ${lastmod}: ${paths.map((p) => p || "/").join(", ")}`);
