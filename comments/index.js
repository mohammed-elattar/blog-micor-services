const express = require('express');
const randomBytes = require('random-bytes');
const app = express();
const cors = require('cors');
const port = 3011;
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const commentsByPostId = [];

app.get('/posts/:id/comments', (req, res) => {
  return res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const random = await randomBytes(4);
  const id = random.toString('hex');
  const postComments = commentsByPostId[req.params.id] || [];
  const content = req.body.content;
  postComments.push({ id, content });
  commentsByPostId[req.params.id] = postComments;

  return res.status(201).send(commentsByPostId[req.params.id]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
