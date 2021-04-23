var express = require('express');
var router = express.Router();
var path = require('path');
var { connectDB } = require('../config/dbconfig');

//get all clients
router.get('/', (req, res) => {

    //calling and querying db
    connectDB((connection) => {
        connection.query('select * from client', (err, result) => {
            if(err){
                console.log(err)
            }
            res.send(result)
        })
    })
})

//get client by id
router.get('/:clientid', (req, res) => {

    //getting clientid param
    let clientid = req.params.clientid;

    //calling and querying db
    connectDB((connection) => {
        connection.query('select * from client where `id` = ?;', [clientid] , (err, result) => {
            if(err){
                console.log(err)
            }
            res.send(result)
        })
    })
})

//post new client
router.post('/register', (req, res) => {

    //req body json obj
    let post = {
        firstname : req.body.fname,
        lastname : req.body.lname,
        email : req.body.email,
        phone : req.body.phone,
        username  : req.body.username,
        password : req.body.password
    }

    //building query string
    let query = `insert into client (firstname, lastname, email, phone, username, password) 
    values ('${post.firstname}', '${post.lastname}',
    '${post.email}', '${post.phone}', 
    '${post.username}', '${post.password}');`;

    //calling and querying db
    connectDB((connection) => {
        connection.query(query, (err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).sendFile('Login.html', {root: path.join(__dirname, '/../public')});
        })
    })
})

//authenticating a client
router.post('/login', (req, res) => {
    let auth = {
        username : req.body.username,
        password : req.body.password
    }

    //building the query string
    let query = `select * from client where username = '${auth.username}' and password = '${auth.password}'`;

    //calling and querying db
    connectDB((connection) => {
        connection.query(query, (err, result) => {
            if(err){
                console.log(err);
            }
            if(!result){
                console.log('user not found');
                res.sendFile('Login.html', {root: path.join(__dirname, '/../public')});
            } else {
                req.session.loggedIn = true;
                console.log(result);
                res.status(200).send(req.session);
            }
        })
    })
})

module.exports = router;