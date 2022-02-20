import sharp from 'sharp';
import smartcrop from 'smartcrop-sharp';
import fs from 'fs';

const contrast = 1.1;
const brightness = 1.1;

function checkFileExistsSync(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.constants.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

const processDirectory = (directory) => {
  const imageFileNames = fs.readdirSync(`./test-images/${directory}`);
  return Promise.all(
    imageFileNames.map(
      async (filename) => {
        if (checkFileExistsSync(`./public/images/${directory}/${filename}`)) {
          return;
        }

        try {
          fs.mkdirSync('./public/images');
        } catch (e) {
        // directory already exists
        }

        try {
          fs.mkdirSync(`./public/images/${directory}`);
        } catch (e) {
        // directory already exists
        }

        smartcrop
          .crop(`./test-images/${directory}/${filename}`, {
            width: 800,
            height: 800,
          })
          .then((processed) => {
            const crop = processed.topCrop;
            sharp(`./test-images/${directory}/${filename}`)
              .extract({
                width: crop.width,
                height: crop.height,
                left: crop.x,
                top: crop.y,
              })
              .rotate()
              .linear(contrast, -(128 * contrast) + 128)
              .modulate({ brightness })
              .toFile(`./public/images/${directory}/${filename}`);
          });
      },
    ),
  );
};

const processDirectories = () => {
  processDirectory('people');
  processDirectory('not-people');
};

export default processDirectories;
