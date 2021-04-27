var express = require('express');
var router = express.Router();
var { connectDB } = require('../config/dbconfig');

//get all calenders
router.get('/', (req, res) => {

    //connecting and querying db
    connectDB((connection) => {
        connection.query('select * from freeDay', (err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).send(result);
        })
    })
})

//get calender by id
router.get('/:freedayid', (req, res) => {

    //getting calender id from params
    let id = req.params.calid;

    //connecting and querying db
    connectDB((connection) => {
        connection.query('select * from freeDay where `id` = ?', [id], (err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).send(result);
        })
    })
})

//get calender by employee id
router.get('/getfromemployee/:employeeid', (req, res) => {

    //getting employeeid from params
    let id = req.params.employeeid;

    //connecting and querying db
    connectDB((connection) => {
        connection.query('select * from freeDay where `employeeid` = ?', [id], (err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).send(result);
        })
    })
})

//post calender
router.post('/create', (req, res) => {

    console.log(req.session);

    let post = {
        date : req.body.date
    }

    console.log(`employeeid: ${post.employeeid}`);

    let query = `insert into freeDay (freedate, employeeid) values ('${post.date}', '${req.session.employeeid}')`;
    connectDB((connection) => {
        connection.query(query, (err, result) =>{
            if(err){
                console.log(err);
            }
            
            res.send(result);
        })
    })
})



module.exports = router;