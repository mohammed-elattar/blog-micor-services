const { default: axios } = require('axios');
const express = require('express');
const app = express();
const port = 3012;
app.use(express.json());

const events = [];

app.get('/events', (req, res) => {
  res.send(events);
});

app.post('/events', async (req, res) => {
  const event = req.body;
  events.push(event);
  axios.post('http://posts-clusterip-srv:3010/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://comments-srv:3011/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://query-srv:3013/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://moderation-srv:3014/events', event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
