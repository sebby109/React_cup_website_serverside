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

let cart_total = 0;
let temp_cart = [];

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
    db.getItems()
    .then(result => response.json(result))
    .catch(e => console.log(e));
});

app.get('/findItem', (request, response) => {
    db.getItem('1')
    .then(result => response.json(result))
    .catch(e => console.log(e));
});

app.get('/getTemp', (request, response) =>{
    response.send(temp_cart);
});

app.post('/addTemp', (request, response) => {

    let id = request.body.id;
    temp_cart.push(id);
    response.send(`added`);
});

app.get('/selection/:selections', (request, response)=> {
    let items_picked = request.params.selections;
    db.getCertainitems(items_picked)
    .then(result => response.json(result))
    .catch(e => console.log(e));
});

// start server
app.listen(port, () => console.log('Listening on port ' + port));