const express = require('express');
const app = express();
const port = 3014;
app.use(express.json());
const posts = {};

app.post('/events', (req, res) => {
  console.log('recieved events on query servcie', req.body);

  res.send({});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
