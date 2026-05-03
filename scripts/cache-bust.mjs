import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, sep } from "node:path";

const htmlPath = "index.html";
const jsDir = "js";
const jsFiles = listFiles(jsDir).filter(file => file.endsWith(".js"));

const hash = createHash("sha256");
hash.update(readFileSync("css/styles.css"));

for (const file of jsFiles) {
    hash.update(normalizeJs(readFileSync(file, "utf8")));
}

const version = hash.digest("hex").slice(0, 10);

let html = readFileSync(htmlPath, "utf8");
html = html.replace(/((?:href=)["']\/?css\/styles\.css)(?:\?v=[^"']*)?(["'])/, `$1?v=${version}$2`);
html = html.replace(/((?:src=)["']\/?js\/main\.js)(?:\?v=[^"']*)?(["'])/, `$1?v=${version}$2`);

writeFileSync(htmlPath, html);

for (const file of jsFiles) {
    const source = readFileSync(file, "utf8");
    const versionedSource = source.replace(
        /(from\s+["'])(\.{1,2}\/[^"']+?\.js)(?:\?v=[^"']*)?(["'])/g,
        `$1$2?v=${version}$3`
    );

    writeFileSync(file, versionedSource);
}

function listFiles(directory) {
    return readdirSync(directory)
        .flatMap(entry => {
            const path = join(directory, entry);

            if (statSync(path).isDirectory()) {
                return listFiles(path);
            }

            return path.split(sep).join("/");
        });
}

function normalizeJs(source) {
    return source.replace(/(from\s+["']\.{1,2}\/[^"']+?\.js)\?v=[^"']*(["'])/g, "$1$2");
}
