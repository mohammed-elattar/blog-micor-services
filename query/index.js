const express = require('express');
const app = express();
const port = 3013;
app.use(express.json());
const posts = {};
app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  console.log('recieved events on query service');
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, postId, content, status } = data;
    const comments = posts[postId].comments;
    const comment = comments.find((comment) => id === comment.id);
    comment.content = content;
    comment.status = status;
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
