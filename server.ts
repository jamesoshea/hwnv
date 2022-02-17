import express from 'express';
import buildHTML from './buildHTML';
import processImages from './processImages';

const app = express();
const PORT = 8000;

app.use(express.static('public', { extensions: ['htm', 'html'] }));

const main = async () => {
  console.log('⚡️[server]: processing images');
  await processImages();

  console.log('⚡️[server]: building static content');
  buildHTML();

  console.log('⚡️[server]: starting server');
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
};

main();
