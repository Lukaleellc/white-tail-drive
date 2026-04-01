'use server'

import fs from 'fs/promises'
import path from 'path'

export async function getGalleryImages(folderName: string, curatedList: { src: string, alt: string }[] = []) {
  try {
    const dirPath = path.join(process.cwd(), 'public', 'images', folderName)
    
    // Read the raw file directory map
    const files = await fs.readdir(dirPath)
    
    // Create a Set of existing curated URLs exactly as they appear in galleries.ts
    const curatedSrcs = new Set(curatedList.map(item => item.src))
    const automatedImages: { src: string, alt: string }[] = []
    
    // Parse findings
    files.forEach(file => {
      // Filter out non-images (like .DS_Store, .gitkeep, etc)
      if (file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
        const srcPath = `/images/${folderName}/${file}`
        
        // Let the Automated algorithm know we haven't seen this one before
        if (!curatedSrcs.has(srcPath)) {
          automatedImages.push({
            src: srcPath,
            // Scrub the filename extension and dashes into an automated alt tag (e.g. "Buck-02.jpg" -> "Buck 02")
            alt: file.replace(/\.[^/.]+$/, "").replace(/-/g, " ")
          })
        }
      }
    })
    
    // Output: Perfect hybrid curation (Manual > Automated)
    return [...curatedList, ...automatedImages]
    
  } catch (error) {
    console.error(`Error reading automated directory ${folderName}:`, error)
    // Always fall back safely to the hardcoded curation on total failure
    return curatedList 
  }
}
