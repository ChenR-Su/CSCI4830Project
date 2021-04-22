var express = require('express');
var router = express.Router();
var path = require('path');
var session = require('express-session');
var { connectDB } = require('../config/dbconfig');

//get all employees
router.get('/', (req, res) => {

    //connecting and querying db
    connectDB((connection) => {
        connection.query('select * from employee', (err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).send(result);
        })
    })
})

//get employee by id
router.get('/:employeeid', (req, res) => {

    //getting employeeid from params
    let id = req.params.employeeid;

    //connecting and querying db
    connectDB((connection) => {
        connection.query('select * from employee where `id` = ?', [id], (err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).send(result);
        })
    })
})

//register new employee
router.post('/register', (req, res) => {

    if(req.body.code == "password"){
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
        let query = `insert into employee (firstname, lastname, email, phone, username, password) 
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
    });
}})

//authenticating an employee
router.post('/login', (req, res) => {
    let auth = {
        username : req.body.username,
        password : req.body.password
    }

    //building the query string
    let query = `select * from employee where username = '${auth.username}' and password = '${auth.password}'`;

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
                console.log(req.sesssion);
                res.status.send('logged in successfully, next steps is to make the two dashboards and redirect the user')
            }
        })
    })
})

module.exports = router;