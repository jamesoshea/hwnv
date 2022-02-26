import fs, { readdirSync } from 'fs';
import path from 'path';

const directories = readdirSync('test-images');
const template = fs
  .readFileSync(path.resolve(__dirname, '../src/template.html'))
  .toString();

const copyStaticContent = () => {
  fs.copyFileSync(path.resolve(__dirname, '../src/template.html'), path.resolve(__dirname, '../public/index.html'));
};

const buildPage = (directory) => {
  const images = fs.readdirSync(path.resolve(__dirname, path.resolve(__dirname, `../test-images/${directory}`)));
  const mappedImages = images.map(
    (imageName) => `<div><img src="${path.resolve(__dirname, `/images/${directory}/${imageName}`)}" /></div>`,
  ).join('');

  const output = template.replace('<section class="image-gallery"></section>', `<section class="image-gallery">${mappedImages}</section>`);

  fs.writeFileSync(path.resolve(__dirname, `../public/${directory}.html`), output);
};

const buildHTML = () => {
  copyStaticContent();
  for (let i = 0; i < directories.length; i += 1) {
    buildPage(directories[i]);
  }
};

export default buildHTML;
