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
const member = model.member

//import auth
// const auth = require("../auth")
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "gondanglegiPride"

//endpoint untuk menampilkan semua data member, METHOD: GET, function FINDALL()
app.get("/", (req,res)=> {
    member.findAll()
    .then(member => {
        res.json({
            count: member.length,
            member: member
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data member, METHOD:POST, function, create
app.post("/", (req,res) => {
    let data = {
        nama : req.body.nama,
        alamat : req.body.alamat,
        jenis_kelamin : req.body.jenis_kelamin,
        tlp : req.body.tlp,
        username : req.body.username,
        password : md5(req.body.password)
    }
    member.create(data)
        .then(result => {
            res.json({
                message : "data has been inserted"
            })
        })
        .catch(error => {
            message : error.message
        })
})

// //endpoint untuk mengupdate data admin, METHOD:PUT,
app.put("/:id", (req,res) => {  //auth,
    let param = {
        id_member : req.params.id
    }
    let data = {
        nama : req.body.nama,
        alamat : req.body.alamat,
        jenis_kelamin : req.body.jenis_kelamin,
        tlp : req.body.tlp,
        username : req.body.username,
        password : md5(req.body.password)
    }
    member.update(data, {where:param})
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
app.delete("/:id", (req,res) => {
    let param = {
        id_member : req.params.id
    }
    member.destroy({where:param})
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

// //endpoint login admin, METHOD: POST, function: findone
// app.post("/auth", async (req, res) => {
//     let data = {
//         username : req.body.username,
//         password : md5(req.body.password)
//     }

//     let result = await admin.findOne({where: data})
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