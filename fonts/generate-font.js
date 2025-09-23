const path = require('path');

const fs = require('fs-extra');
const svg2ttf = require('svg2ttf');

(async () => {
    const {SVGIcons2SVGFontStream} = await import('svgicons2svgfont');

    const svgDir = path.join(__dirname, 'svg');
    const outDir = path.join(__dirname, 'dist');
    await fs.ensureDir(outDir);

    const mapPath = path.join(__dirname, 'glyph-map.json');
    let glyphMap = {};
    if (fs.existsSync(mapPath)) {
        glyphMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
    }

    const files = await fs.readdir(svgDir);
    const svgFiles = files.filter(file => file.endsWith('.svg')).sort();

    if (svgFiles.length === 0) {
        console.error('No se encontraron archivos SVG en la carpeta svg.');
        process.exit(1);
    }

    const fontName = 'nova-icons';
    const svgFontPath = path.join(outDir, `${fontName}.svg`);

    const fontStream = new SVGIcons2SVGFontStream({
        fontName,
        normalize: true,
        fontHeight: 1000,
    });

    fontStream.on('error', err => {
        console.error('Error generando fuente SVG:', err);
    });

    const svgFontFile = fs.createWriteStream(svgFontPath);
    fontStream.pipe(svgFontFile);

    let nextCode = 0xe000;
    if (Object.keys(glyphMap).length > 0) {
        const assignedCodes = Object.values(glyphMap).map(ch => ch.charCodeAt(0));
        const maxCode = Math.max(...assignedCodes);
        nextCode = maxCode + 1;
    }

    for (const file of svgFiles) {
        const iconPath = path.join(svgDir, file);
        const glyphName = path.basename(file, '.svg');

        let unicodeChar;
        if (glyphMap[glyphName]) {
            unicodeChar = glyphMap[glyphName];
        } else {
            unicodeChar = String.fromCharCode(nextCode++);
            glyphMap[glyphName] = unicodeChar;
        }

        const glyph = fs.createReadStream(iconPath);
        glyph.metadata = {unicode: [unicodeChar], name: glyphName};
        fontStream.write(glyph);
    }

    fontStream.end();

    svgFontFile.on('finish', async () => {
        console.log('Fuente SVG generada correctamente.');

        fs.writeFileSync(mapPath, JSON.stringify(glyphMap, null, 2), 'utf8');

        const svgFontData = fs.readFileSync(svgFontPath, 'utf8');
        const ttf = svg2ttf(svgFontData, {});
        const ttfPath = path.join(outDir, `${fontName}.ttf`);
        fs.writeFileSync(ttfPath, Buffer.from(ttf.buffer));
        console.log('Fuente TTF generada correctamente.');
    });
})();