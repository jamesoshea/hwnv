import sharp from 'sharp';
import smartcrop from 'smartcrop-sharp';
import fs from 'fs';

const imageFileNames = fs.readdirSync('./test-images');

const contrast = 1.1;
const brightness = 1.1;

export default () => Promise.all(imageFileNames.map((filename) => new Promise((res) => {
  smartcrop.crop(`./test-images/${filename}`, {
    width: 800,
    height: 800,
  }).then((processed) => {
    const crop = processed.topCrop;
    res(sharp(`./test-images/${filename}`)
      .extract({
        width: crop.width,
        height: crop.height,
        left: crop.x,
        top: crop.y,
      })
      .rotate()
      .linear(contrast, -(128 * contrast) + 128)
      .modulate({ brightness })
      .toFile(`./public/images/${filename}`));
  });
})));
