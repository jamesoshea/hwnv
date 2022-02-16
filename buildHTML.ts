import fs from 'fs';
import path from 'path';

const buildHTML = () => {
  const template = fs
    .readFileSync(path.resolve(__dirname, './public/template.html'))
    .toString();
  const images = fs.readdirSync(path.resolve(__dirname, './public/images'));
  const mappedImages = images.map(
    (filename) => `<div><img src="${path.resolve(__dirname, `/images/${filename}`)}" /></div>`,
  ).join('');

  // TODO: clean up folder structure for deployment
  const output = template.replace('<section class="image-gallery"></section>', `<section class="image-gallery">${mappedImages}</section>`);

  fs.writeFileSync(path.resolve(__dirname, './public/index.html'), output);
};
export default buildHTML;
