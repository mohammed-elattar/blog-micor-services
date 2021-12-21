const { default: axios } = require('axios');
const express = require('express');
const app = express();
const port = 3012;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/events', async (req, res) => {
  const event = req.body;
  axios.post('http://localhost:3010/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:3011/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:3013/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:3014/events', event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
