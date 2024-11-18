const upath = require('upath');
const sh = require('shelljs');

module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');
    
    // copy the whole assets dir
    sh.cp('-R', sourcePath, destPath);
    
    // List of files to copy
    const filesToCopyInMainDir = [
        'favicon.ico',
        'robots.txt',
        // 'sitemap.xml', // Example file for SEO
        // 'manifest.json', // Example file for PWA
    ];

    // Copy each asset
    filesToCopyInMainDir.forEach(asset => {
        const filePath = upath.resolve(sourcePath, asset);
        sh.cp(filePath, destPath);
    });
};