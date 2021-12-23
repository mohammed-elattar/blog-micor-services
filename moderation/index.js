const express = require('express');
const app = express();
const port = 3014;
app.use(express.json());
const { default: axios } = require('axios');

app.post('/events', async (req, res) => {
  console.log('recieved events on query service');
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { content } = data;

    const status = content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://event-bus-srv:3012/events', {
      type: 'CommentModerated',
      data: { ...data, status },
    });
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
