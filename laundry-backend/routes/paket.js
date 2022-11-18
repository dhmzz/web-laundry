//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model 
const model = require('../models/index');
const res = require('express/lib/response');
const paket = model.paket


//Endpoint Post Paket 
app.post("/", (req,res) => {
    let data = {
        jenis : req.body.jenis,
        harga : req.body.harga
    }
    paket.create(data)
        .then(result => {
            res.json({
                message : "data has been inserted"
            })
        })
        .catch(error => {
            message : error.message
        })
})

//Endpoint Get Paket
app.get("/", (req,res)=> {
    paket.findAll()
    .then(paket => {
        res.json({
            count: paket.length,
            paket: paket
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app