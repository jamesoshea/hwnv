import sharp from 'sharp';
import smartcrop from 'smartcrop-sharp';
import fs from 'fs';

const imageFileNames = fs.readdirSync('./test-images');

const contrast = 1.1;
const brightness = 1.1;

const main = async () => {
  imageFileNames.forEach(async (filename) => {
    const processed = await smartcrop.crop(`./test-images/${filename}`, { width: 800, height: 800 });
    const crop = processed.topCrop;
    return sharp(`./test-images/${filename}`)
      .extract({
        width: crop.width, height: crop.height, left: crop.x, top: crop.y,
      })
      .rotate()
      .linear(contrast, -(128 * contrast) + 128)
      .modulate({ brightness })
      .toFile(`./output/${filename}`);
  });
};

main();
