// Regenerates the favicon / app-icon set from the single source logo.
//
// Runs on postbuild so the icons can never drift from mylogo.png. The source is
// 574x435 with an alpha channel, so every output uses `contain` against a
// transparent background — cropping a non-square monogram would clip it.

import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const SOURCE = "public/images/mylogo.png";
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

const square = (size) => sharp(SOURCE).resize(size, size, { fit: "contain", background: TRANSPARENT }).png().toBuffer();

const PNG_ICONS = [
  { file: "public/favicon-32.png", size: 32 },
  { file: "public/apple-touch-icon.png", size: 180 },
  { file: "public/icon-192.png", size: 192 },
  { file: "public/icon-512.png", size: 512 },
];

for (const { file, size } of PNG_ICONS) {
  await writeFile(file, await square(size));
}

// favicon.ico — no ICO tooling on this machine, and the format allows a PNG
// payload (Vista+), so the container is a 6-byte ICONDIR, a 16-byte
// ICONDIRENTRY, then the PNG itself.
const icoPng = await square(32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette size (0 = no palette)
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(icoPng.length, 14); // payload size
header.writeUInt32LE(22, 18); // payload offset
await writeFile("public/favicon.ico", Buffer.concat([header, icoPng]));

const manifest = {
  name: "Bagombeka Job — Software Engineer",
  short_name: "Bagombeka Job",
  description: "Software engineer building national-scale platforms and enterprise systems.",
  start_url: "/",
  display: "standalone",
  theme_color: "#0d9488",
  background_color: "#fafafa",
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
  ],
};

await writeFile("public/manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`icons written: ${PNG_ICONS.length} PNGs, favicon.ico (${icoPng.length}B payload), manifest.json`);
