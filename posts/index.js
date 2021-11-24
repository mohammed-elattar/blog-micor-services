const express = require('express');
const randomBytes = require('random-bytes');
const app = express();
const port = 3010;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const posts = {};

app.get('/posts', (req, res) => {
  return res.json(posts);
});

app.post('/posts', async (req, res) => {
  const random = await randomBytes(4);
  const id = random.toString('hex');
  const title = req.body.title;
  posts[id] = { id, title };
  return res.status(201).send(posts[id]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
