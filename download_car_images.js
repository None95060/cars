import fs from 'fs';
import axios from 'axios';
import path from 'path';
import { carImageMap } from './src/carImageMap.js';

const API_KEY = 'bGDZM95iQ78xmuy72LmGFJHJAeFOS1nY7jjTiMC4lsYENrMEqkWEgBB8';

async function downloadImage(url, filepath) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(filepath, response.data);
    console.log(`Downloaded: ${filepath}`);
  } catch (error) {
    console.error(`Error downloading ${url}:`, error.message);
  }
}

async function downloadCarImages() {
  const carsDir = 'src/assets/cars';

  // Ensure the directory exists
  if (!fs.existsSync(carsDir)) {
    fs.mkdirSync(carsDir, { recursive: true });
  }

  for (const [carName, imageName] of Object.entries(carImageMap)) {
    const filepath = path.join(carsDir, imageName);

    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`Skipping ${carName} - file already exists`);
      continue;
    }

    try {
      console.log(`Searching for ${carName}...`);
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(carName)}&per_page=1`, {
        headers: {
          'Authorization': API_KEY
        }
      });

      if (response.data.photos.length > 0) {
        const imageUrl = response.data.photos[0].src.large;
        await downloadImage(imageUrl, filepath);
      } else {
        console.log(`No images found for ${carName}`);
      }
    } catch (error) {
      console.error(`Error fetching image for ${carName}:`, error.message);
    }

    // Delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('All car images downloaded!');
}

downloadCarImages().catch(console.error);
