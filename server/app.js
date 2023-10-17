const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('testing');
})

app.listen(4000, () => console.log('4000번 포트'));