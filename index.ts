import sharp from 'sharp';
import smartcrop from 'smartcrop-sharp';
import fs from 'fs';

const imageFileNames = fs.readdirSync('./test-images');

const main = async () => {
  imageFileNames.forEach(async (filename) => {
    const processed = await smartcrop.crop(`./test-images/${filename}`, { width: 1000, height: 1000 });
    const crop = processed.topCrop;
    return sharp(`./test-images/${filename}`)
      .extract({
        width: crop.width, height: crop.height, left: crop.x, top: crop.y,
      })
      .resize(500, 500)
      .rotate()
      .toFile(`./test-images/CROPPED${filename}`);
  });
};

main();
