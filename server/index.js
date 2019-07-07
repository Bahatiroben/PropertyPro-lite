import uuid from 'uuid';
import express from 'express';

const PORT = process.env.PORT || 1;
const app = express();

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}...`);
});
