'use strict';
const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');

function generateSitemap() {
    const distPath = upath.resolve(upath.dirname(__filename), '../dist');
    const baseUrl = 'https://ai4health2026.com'; // Replace with your actual website URL
    const sitemapPath = upath.join(distPath, 'sitemap.xml');

    // Dictionary for filenames and their priorities
    const priorityMap = {
        // This is the homepage and entry point for the site. It should remain the highest priority
        'index.html': 1.0,
        // Contact information is vital for inquiries and post-event feedback. A slightly higher priority is justified
        'contact.html': 0.6,
        // Essential for showcasing the event's credibility. Attendees may want to learn about the organizers
        'organization.html': 0.7,
        // Partners add value to the event and enhance its reputation. Giving them moderate visibility is fair.
        'partners.html': 0.5,
        // Posters may contain critical research or insights, especially for academic or professional events.
        'posters.html': 0.6,
        // // When easyto use, Registration is crucial for event participation. Attendees need quick and easy access to this page.
        'registration-form.html': 0.1,
        // Registration confirmation or follow-up processes remain essential. Keep its priority high.
        'registration.html': 0.1, // registration is closed, after event
        // The event schedule is a key resource for attendees. Elevating its priority slightly highlights its importance.
        'schedule.html': 0.9,
        // Speaker profiles are often a draw for attendees. Ensuring good visibility boosts engagement.
        'speakers.html': 0.7, 
    };

    // Default priority for pages not listed in the dictionary
    const defaultPriority = 0.5;

    // Find all .html files in the dist directory, excluding error pages
    const htmlFiles = sh.find(distPath).filter(file => {
        const fileName = upath.basename(file);
        return (
            file.endsWith('.html') &&
            !fileName.match(/^\d{3}\.html$/) // Exclude files like 401.html, 404.html, etc.
        );
    });

    // Generate sitemap entries for HTML files
    const urls = htmlFiles.map(file => {
        const relativePath = upath.relative(distPath, file);
        const url = (upath.basename(file) === 'index.html') ? `${baseUrl}/` : `${baseUrl}/${relativePath.replace(/\\/g, '/')}`;

        // Get priority from dictionary or use default
        const fileName = upath.basename(file);
        const priority = priorityMap[fileName] || defaultPriority;

        return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${priority}</priority>
  </url>`;
    });

//     // Add a special entry for the favicon.ico
//     urls.push(`  <url>
//     <loc>${baseUrl}/favicon.ico</loc>
//     <lastmod>${new Date().toISOString()}</lastmod>
//     <priority>0.5</priority>
//   </url>`);

    // Construct the sitemap
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    // Write sitemap.xml to the dist directory
    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log(`### INFO: Sitemap generated at ${sitemapPath}`);
}

generateSitemap();
