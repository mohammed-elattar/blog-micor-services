const express = require('express');
const app = express();
const port = 3013;
app.use(express.json());
app.get('/posts', (req, res) => {
  res.send('posts here');
});

app.post('/events', (req, res) => {
  res.send('to recieve events');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
