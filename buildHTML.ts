import fs from 'fs';
import path from 'path';

const buildPage = (directory) => {
  const template = fs
    .readFileSync(path.resolve(__dirname, './template.html'))
    .toString();

  const images = fs.readdirSync(path.resolve(__dirname, `./public/images/${directory}`));
  const mappedImages = images.map(
    (imageName) => `<div><img src="${path.resolve(__dirname, `/images/${directory}/${imageName}`)}" /></div>`,
  ).join('');

  const output = template.replace('<section class="image-gallery"></section>', `<section class="image-gallery">${mappedImages}</section>`);

  fs.writeFileSync(path.resolve(__dirname, `./public/${directory}.html`), output);
};

const buildHTML = () => {
  buildPage('people');
  buildPage('not-people');
};

export default buildHTML;
