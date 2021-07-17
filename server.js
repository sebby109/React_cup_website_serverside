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

app.get('/add/:a/:b', (request, response) =>{
    let a = request.params.a;
    let b = request.params.b;
    let sum = a + b;
    response.send(`${a} + ${b} = ${sum}`);
});

// start server
app.listen(port, () => console.log('Listening on port ' + port));