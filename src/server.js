const express = require('express');
const app = express();
const port = 8080;
const routerServer = require('./routes/index.js');
const logger = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'public'));
app.use(logger('dev'));

app.use(routerServer)

app.listen(port, (error) => {
    if (error) {
        console.log('Something went wrong', error);
    }
  console.log(`Server is listening at http://localhost:${port}`);
});
