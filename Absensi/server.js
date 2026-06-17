const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post('/save', (req, res) => {
  fs.writeFileSync('data.json', JSON.stringify(req.body, null, 2));
  res.send('Data tersimpan');
});

app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});