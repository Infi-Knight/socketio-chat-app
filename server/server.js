var express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
app.use(express.static(publicPath));

app.get('/', (req, res) => {

});
app.listen(port, process.env.IP, () => {
  console.log(`Server up and running on port ${port}`);
});
