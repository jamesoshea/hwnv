import fs from 'fs';
import path from 'path';

const buildHTML = () => {
  const template = fs
    .readFileSync(path.resolve(__dirname, './public/template.html'))
    .toString();
  const images = fs.readdirSync(path.resolve(__dirname, './public/images'));
  const mappedImages = images.map(
    (filename) => `<img src="${path.resolve(__dirname, `/images/${filename}`)}" style="width:500px" />`,
  ).join('<br />');

  // TODO: add img tags for each image, clean up folder structure for deployment

  const output = template.replace('<section id="image-gallery"></section>', `<section id="image-gallery">${mappedImages}</section>`);

  fs.writeFileSync(path.resolve(__dirname, './public/index.html'), output);
  console.log('done');
};
export default buildHTML;
