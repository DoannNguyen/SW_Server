const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const port = 3000;

const route=require('./src/routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.json({limit: '50mb'}));


route(app);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
