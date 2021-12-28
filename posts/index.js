const express = require('express');
const randomBytes = require('random-bytes');
const app = express();
const cors = require('cors');
const { default: axios } = require('axios');
const port = 3010;
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const posts = {};

app.post('/events', (req, res) => {
  console.log('recieved events on posts service');
  return;
});

app.post('/posts/create', async (req, res) => {
  const random = await randomBytes(4);
  const id = random.toString('hex');
  const title = req.body.title;
  const newPost = { id, title };
  posts[id] = newPost;

  await axios.post('http://event-bus-srv:3012/events', {
    type: 'PostCreated',
    data: { ...newPost },
  });
  return res.status(201).send(posts[id]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
