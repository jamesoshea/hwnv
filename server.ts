import express from 'express';
import buildHTML from './scripts/buildHTML';
import processCSS from './scripts/processCSS';
import processImages from './scripts/processImages';

const app = express();
const PORT = 8000;

app.use(express.static('public', { extensions: ['htm', 'html'] }));

const main = async (): Promise<void> => {
  console.log('⚡️[server]: processing images');
  await processImages();

  console.log('⚡️[server]: building static content');
  buildHTML();

  console.log('⚡️[server]: processing stylesheets');
  processCSS();

  console.log('⚡️[server]: starting server');
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
};

main();
