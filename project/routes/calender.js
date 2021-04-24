var express = require('express');
var router = express.Router();
var { connectDB } = require('../config/dbconfig');

//get all calenders
router.get('/', (req, res) => {

    //connecting and querying db
    connectDB((connection) => {
        connection.query('select * from calender', (err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).send(result);
        })
    })
})

//get calender by id
router.get('/:calid', (req, res) => {

    //getting calender id from params
    let id = req.params.calid;

    //connecting and querying db
    connectDB((connection) => {
        connection.query('select * from calender where `id` = ?', [id], (err, result) => {
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
        connection.query('select * from calender where `employeeid` = ?', [id], (err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).send(result);
        })
    })
})

//post calender
router.post('/', (req, res) => {

    let post = {
        employeeid : req.body.employeeid
    }

    console.log(`employeeid: ${post.employeeid}`);

    connectDB((connection) => {
        connection.query('select * from calender where `employeeid` = ?', [post.employeeid], (err, result) =>{
            if(err){
                console.log(err);
            }
            Object.keys(result).forEach(entry => {
                resultValue = result[entry]['id'];
                
            })
            res.send(result);
        })
    })
})



module.exports = router;