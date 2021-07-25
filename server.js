// dependencies
const express = require('express');
var cors = require('cors');
const { response, request } = require('express');

// this is syntax for importing in node.js 
const db = require('./db');

// create the server
const app = express();
const port = process.env.PORT || 4002;

// express.json() used to interpret for all in coming requests.
app.use(express.json());
app.use(cors());

let items = [{'name': 'cup1'}];
let cart_total = 0;

app.get('/cart', (request, response) => {
    // gives us current cart number.
    response.json(cart_total);
});

app.post('/addCart', (request, response) => {
    // used to save the number of items they added to the cart. 
    // had bug here but disappeared?
    let i = request.body.count;
    cart_total += Number(i);
    response.send(`${i}`)
});

app.get('/', (request, response) => {
    response.send('<h1>Cups server side.</h1>');
});

app.get('/item/:name', (request, response) => {
    let name = request.params.name;
    let item = items.find(x => x.name === name);
    if(item){
        response.json(item);
    }
    else{
        response.status(404).send(`Item ${name} not found.`);
    }
});

app.post('/item', (request, response) => {
    let name = request.body.name;
    let item = {name: name};
    items.push(item);
    response.send(`The item ${name} added.`);
});

app.get('/items', (request, response) => {
    // let off here. Fixed bug. had to be response.json( result in here)
    db.getItems()
    .then(result => response.json(result))
    .catch(e => console.log(e));
});

// start server
app.listen(port, () => console.log('Listening on port ' + port));