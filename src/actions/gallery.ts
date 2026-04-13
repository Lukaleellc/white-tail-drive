'use server'

import generatedData from '@/data/generated-galleries.json'

export async function getGalleryImages(folderName: string, curatedList: { src: string, alt: string }[] = []) {
  try {
    // 1. Fetch the pre-built JSON array for this specific folder
    const automatedRawList = (generatedData as Record<string, { src: string, alt: string }[]>)[folderName] || []
    
    // 2. Create a Set of existing curated URLs exactly as they appear in the priority list
    const curatedSrcs = new Set(curatedList.map(item => item.src))
    const automatedImages: { src: string, alt: string }[] = []
    
    // 3. Deduplicate: Only append if NOT already in the curated priority list
    automatedRawList.forEach(img => {
      if (!curatedSrcs.has(img.src)) {
        automatedImages.push(img)
      }
    })
    
    // Output: Perfect hybrid curation (Manual > Automated)
    return [...curatedList, ...automatedImages]
    
  } catch (error) {
    console.error(`Error reading cached automated directory ${folderName}:`, error)
    // Always fall back safely to the hardcoded curation on total failure
    return curatedList 
  }
}
