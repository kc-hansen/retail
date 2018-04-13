require('dotenv').config();

const express = require('express');
const session = require('express-session');
const massive = require('massive')
const bodyParser = require('body-parser')

const { SERVER_PORT, CONNECTION_STRING } = process.env;

const app = express().use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

app.get('/api/bin/:id', (req, res) => {
    app.get('db').getBins([req.params.id]).then(resp => {
        res.status(200).send(resp)
    })
})

app.get('/api/shelf/:id', (req, res) => {
    const db = app.get('db');
    db.getshelf([req.params.id]).then(resp => {
        res.status(200).send(resp)
    })
})

app.delete('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    db.deleteBin([req.params.id]).then(resp => {
        console.log(req.params.id)
        res.status(200).send('Deleted')
    })
})

app.post('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    console.log([req.params.id, req.body.item, req.body.amount])
    db.postBin([req.params.id, req.body.amount, req.body.item]).then(resp => {
        res.status(200).send('added bin')
    })
})

app.put('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    console.log([req.params.id, req.body.item, req.body.amount])
    db.putBin([req.params.id, req.body.amount, req.body.item]).then(resp => {
        res.status(200).send('bin updated')
    })
})


app.get('/api/cart', function( req, res ) {
    let userID = req.user.usersid
    app.get('db').select_all_from_cart([userID]).then(response => {
        console.log(response)
        res.status(200).send(response)
    })
} ) 
app.get('/api/totalprice', function( req, res ) {
    app.get('db').totalprice().then( response => {
        res.status(200).send(response)
    })
})
app.delete('/api/removefromcart/:products', function( req, res ) {
    console.log('test', req.params)
    app.get('db').delete_from_cart([req.params.products]).then(response => {
        res.status(200).send(response)
    })
} )
app.put('/api/updatequantity/:products/:cartid', function ( req, res ) {
    console.log(req.params.products)
    console.log(req.params.cartid)
    app.get('db').update_quant([+req.params.products, +req.params.cartid]).then(response => {
        res.status(200).send(response)
    })
} )

app.post('/api/addToCart', (req, res) => {
    let { productsID } = req.body
    console.log('req.user', req.body)
    let usersID = req.user.usersid
    app.get('db').add_to_cart([usersID, productsID]).then(response => {
        res.status(200).send('Item added to cart')
    })
})

    app.get('/api/longboards', function (req, res) {
        console.log("GET BOARDS USER", req.user)
        app.get('db').select_all_longboards().then(response => {
            res.status(200).send(response)
        })

    })

    app.listen(SERVER_PORT, () => {
        console.log(`for the pirate in the family: ${SERVER_PORT}`)
    });

