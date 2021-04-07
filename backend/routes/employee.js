var express = require('express');
var router = express.Router();
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

//post new employee
router.post('/', (req, res) => {

    //req body json obj
    let post = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
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
            res.status(200).send(result);
        })
    })
})

module.exports = router;