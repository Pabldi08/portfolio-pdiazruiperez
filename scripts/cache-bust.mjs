import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const htmlPath = "index.html";
const assets = [
    { path: "css/styles.css", pattern: /((?:href=)["']\/?css\/styles\.css)(?:\?v=[^"']*)?(["'])/ },
    { path: "js/main.js", pattern: /((?:src=)["']\/?js\/main\.js)(?:\?v=[^"']*)?(["'])/ }
];

let html = readFileSync(htmlPath, "utf8");

for (const asset of assets) {
    const hash = createHash("sha256")
        .update(readFileSync(asset.path))
        .digest("hex")
        .slice(0, 10);

    html = html.replace(asset.pattern, `$1?v=${hash}$2`);
}

writeFileSync(htmlPath, html);
