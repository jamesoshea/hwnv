import fs from 'fs';
import path from 'path';
import sass from 'sass';

export default () => {
  const result = sass.renderSync({
    file: path.resolve(__dirname, '../src/styles.scss'),
  });

  fs.writeFileSync(path.resolve(__dirname, '../public/styles.css'), result.css.toString());
};
