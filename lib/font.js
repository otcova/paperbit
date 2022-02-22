"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFNT = void 0;
async function loadFNT(url) {
    var _a, _b;
    const fnt = await (await fetch(url)).text();
    let font = {};
    let lineCount = 0;
    // Read file
    for (const line of fnt.split("\n")) {
        ++lineCount;
        const words = line.trim().replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g, "'").split(/'+/);
        if (words.length > 0) {
            const lineData = {};
            for (const word of words.slice(1, words.length)) {
                const [key, value] = word.split("=");
                if (value.startsWith('"') && value.endsWith('"'))
                    lineData[key] = value.replace(/["]/, "");
                else if (!Number.isNaN(Number(value)))
                    lineData[key] = Number(value);
                else
                    lineData[key] = value.split(",").map(v => Number(v));
            }
            if (font[words[0]])
                font[words[0]] = Array.isArray(font[words[0]]) ? [...font[words[0]], lineData] : [font[words[0]], lineData];
            else
                font[words[0]] = lineData;
        }
    }
    // Create Map
    const scale = 1 / font.common.lineHeight;
    const atlas = { map: new Map() };
    for (const char of font.char) {
        atlas.map.set(String.fromCharCode(char.id), {
            a: [char.x / font.common.scaleW, char.y / font.common.scaleH],
            b: [(char.x + char.width) / font.common.scaleW, (char.y + char.height) / font.common.scaleH],
            offset: [char.xoffset * scale, char.yoffset * scale],
            advance: char.xadvance * scale,
            kerning: new Map(),
            height: char.height * scale
        });
    }
    for (const kerning of font.kerning) {
        const firstChar = String.fromCharCode(kerning.first);
        const secondChar = String.fromCharCode(kerning.second);
        (_a = atlas.map.get(firstChar)) === null || _a === void 0 ? void 0 : _a.kerning.set(secondChar, kerning.amount * scale);
        (_b = atlas.map.get(secondChar)) === null || _b === void 0 ? void 0 : _b.kerning.set(firstChar, kerning.amount * scale);
    }
    return atlas;
}
exports.loadFNT = loadFNT;
//# sourceMappingURL=font.js.map