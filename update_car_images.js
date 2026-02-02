import fs from 'fs';
import axios from 'axios';

const API_KEY = 'bGDZM95iQ78xmuy72LmGFJHJAeFOS1nY7jjTiMC4lsYENrMEqkWEgBB8';

async function getCarImage(carName) {
  try {
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(carName)}&per_page=1`, {
      headers: {
        'Authorization': API_KEY
      }
    });
    if (response.data.photos.length > 0) {
      const imageUrl = response.data.photos[0].src.large;
      return imageUrl;
    }
  } catch (error) {
    console.error(`Error fetching image for ${carName}:`, error.message);
  }
  return null;
}

async function updateCarImages() {
  const filePath = 'src/Dashboard.jsx';
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract the carsData array
  const carsMatch = content.match(/const carsData = \[\s*([\s\S]*?)\s*\];/);
  if (!carsMatch) {
    console.error('Could not find carsData array in the file');
    return;
  }

  const carsString = carsMatch[1];
  const carObjects = carsString.split(/},\s*{/).map((obj, index, arr) => {
    if (index > 0) obj = '{' + obj;
    if (index < arr.length - 1) obj += '}';
    return obj;
  });

  for (let i = 0; i < carObjects.length; i++) {
    const carObj = carObjects[i];
    const nameMatch = carObj.match(/name: '([^']+)'/);
    if (nameMatch) {
      const carName = nameMatch[1];
      console.log(`Updating image for ${carName}...`);
      const imageUrl = await getCarImage(carName);
      if (imageUrl) {
        // Update the image field
        const imageRegex = new RegExp(`(image: '[^']*')`, 'g');
        carObjects[i] = carObj.replace(imageRegex, `image: '${imageUrl}'`);

        // Update the images array
        const imagesRegex = /images: \[[^\]]*\]/g;
        const newImages = `images: ['${imageUrl}', '${imageUrl}', '${imageUrl}', '${imageUrl}']`;
        carObjects[i] = carObjects[i].replace(imagesRegex, newImages);
      }
    }
  }

  // Reconstruct the carsData array
  const updatedCarsString = carObjects.join(',\n    ');

  // Replace in the content
  const updatedContent = content.replace(carsMatch[0], `const carsData = [\n    ${updatedCarsString}\n  ];`);

  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log('Car images updated successfully!');
}

updateCarImages().catch(console.error);
