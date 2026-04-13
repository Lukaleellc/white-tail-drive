import fs from 'fs/promises';
import path from 'path';

// Directories to scan automatically
const FOLDERS = ['gallery-wildlife', 'gallery-landscape'];

async function generate() {
  const outputData = {};

  for (const folder of FOLDERS) {
    try {
      const dirPath = path.join(process.cwd(), 'public', 'images', folder);
      const files = await fs.readdir(dirPath);
      
      const images = files
        .filter(file => file.match(/\.(jpg|jpeg|png|webp|gif)$/i))
        .map(file => {
          return {
            src: `/images/${folder}/${file}`,
            // Scrub the filename extension and dashes into an automated alt tag
            alt: file.replace(/\.[^/.]+$/, "").replace(/-/g, " ")
          };
        });
      
      // Store in payload under folder key 
      outputData[folder] = images;
    } catch (err) {
      console.error(`Warning: Could not read ${folder} during pre-build:`, err.message);
      outputData[folder] = [];
    }
  }

  // Ensure src/data exists
  const dataDir = path.join(process.cwd(), 'src', 'data');
  await fs.mkdir(dataDir, { recursive: true });

  // Write it out exclusively for the actions file to ingest as static JSON
  const outputPath = path.join(dataDir, 'generated-galleries.json');
  await fs.writeFile(outputPath, JSON.stringify(outputData, null, 2));
  console.log(`\x1b[32m[Pre-Build] Generated static artifact for ${Object.values(outputData).flat().length} automated gallery images.\x1b[0m`);
}

generate();
