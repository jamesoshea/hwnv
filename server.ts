import express from 'express';
import buildHTML from './buildHTML';
import processImages from './processImages';

const app = express();
const PORT = 8000;

app.use(express.static('public'));

processImages().then(() => {
  buildHTML();
});

app.get('/', (_req, res) => res.sendFile('index.html'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
