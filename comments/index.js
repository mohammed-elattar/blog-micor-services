const express = require('express');
const randomBytes = require('random-bytes');
const app = express();
const cors = require('cors');
const { default: axios } = require('axios');
const port = 3011;
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const commentsByPostId = [];

app.post('/events', (req, res) => {
  console.log('recieved events on Comments servcie', req.body);
  return;
});

app.get('/posts/:id/comments', (req, res) => {
  return res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const random = await randomBytes(4);
  const id = random.toString('hex');
  const postId = req.params.id;
  const postComments = commentsByPostId[postId] || [];
  const content = req.body.content;
  const newComment = { id, content };
  postComments.push(newComment);
  commentsByPostId[req.params.id] = postComments;
  await axios.post('http://localhost:3012/events', {
    type: 'CommentCreated',
    data: { ...newComment, postId },
  });
  return res.status(201).send(commentsByPostId[req.params.id]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
