const { default: axios } = require('axios');
const express = require('express');
const app = express();
const port = 3012;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/events/', (req, res) => {
  const event = req.body;
  axios.post('http://loclahost:3010/events', event);
  axios.post('http://loclahost:3011/events', event);
  axios.post('http://loclahost:3012/events', event);

  res.send({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
