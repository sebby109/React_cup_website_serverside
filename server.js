// dependencies
const express = require('express');
var cors = require('cors');
const { response } = require('express');
//const db = require('./db');

// create the server
const app = express();
const port = process.env.PORT || 4002;
app.use(express.json());
app.use(cors());


app.get('/', (request, response) => {
    response.send('<h1>Cups server side.</h1>');
});

// start server
app.listen(port, () => console.log('Listening on port ' + port));