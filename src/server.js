const express = require('express');
const app = express();
const port = 8080; // the port I'm using for my server
const routerServer = require('./routes/index.js'); // I import my routes from src/routes/index.js for cleaner code
const logger = require('morgan'); // I saw this in youtube and I thought it was cool so I used it

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(__dirname+'public')); // didn't know if I had to use it or not
app.use(logger('dev')); // I use it to see the requests in the console (I saw it in youtube)

app.use(routerServer) // I use my routes from src/routes/index.js

app.listen(port, (error) => {
    if (error) {
        console.log('Something went wrong', error);
    }
  console.log(`Server is listening at http://localhost:${port}`);
});
