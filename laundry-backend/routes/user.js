//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model 
const model = require('../models/index');
const res = require('express/lib/response');
const user = model.user

//import auth
// const auth = require("../auth")
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "gondanglegiPride"

//endpoint untuk menampilkan semua data user, METHOD: GET, function FINDALL()
app.get("/", (req,res)=> {
    user.findAll()
    .then(user => {
        res.json({
            count: user.length,
            user: user
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/:id", (req, res) =>{
    customer.findOne({ where: {id_user: req.params.id}})
    .then(result => {
        res.json({
            customer: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})


//endpoint untuk menyimpan data admin, METHOD:POST, function, create
app.post("/", (req,res) => {
    let data = {
        nama : req.body.nama,
        username : req.body.username,
        password : md5(req.body.password)
    }
    user.create(data)
        .then(result => {
            res.json({
                message : "data has been inserted"
            })
        })
        .catch(error => {
            message : error.message
        })
})

// endpoint untuk mengupdate data admin, METHOD:PUT,
app.put("/:id", (req,res) => {
    let param = {
        id_user : req.params.id
    }
    let data = {
        nama : req.body.nama,
        username : req.body.username,
        password : md5(req.body.password)
    }
    user.update(data, {where:param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

// endpoint menghapus data admin, METHOD Delete , Function: destroy
app.delete("/:id",  (req,res) => {
    let param = {
        id_user : req.params.id
    }
    user.destroy({where:param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint login admin, METHOD: POST, function: findone
// app.post("/auth", async (req, res) => {
//     let data = {
//         username : req.body.username,
//         password : md5(req.body.password)
//     }

//     let result = await user.findOne({where: data})
//     if(result) {
//         //set payload from data
//         let payload = JSON.stringify(result)
//         //generate token berdasarkan payload dan SECRET_KEY
//         let token = jwt.sign(payload, SECRET_KEY)

//         res.json({
//             logged: true,
//             data: result,
//             token: token
//         })
//     }
//     else{
//         res.json({
//             logged: false,
//             message: "Invalid username or password"
//         })
//     }
// })

module.exports = app