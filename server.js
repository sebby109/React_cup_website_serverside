// dependencies
const express = require('express');
var cors = require('cors');
const { response } = require('express');
//const db = require('./db');

// create the server
const app = express();
const port = process.env.PORT || 4002;

// express.json() used to interpret for all in coming requests.
app.use(express.json());
app.use(cors());

let items = [];


app.get('/', (request, response) => {
    response.send('<h1>Cups server side.</h1>');
});

app.get('/add/:a/:b', (request, response) =>{
    let a = request.params.a;
    let b = request.params.b;
    let sum = Number(a) + Number(b);
    response.send(`${a} + ${b} = ${sum}`);
});

app.post('/item', (request, response) => {
    let name = request.body.name;
    let item = {item: item};
    items.push(item);
    response.send(`The item ${name} added.`);
});

// start server
app.listen(port, () => console.log('Listening on port ' + port));