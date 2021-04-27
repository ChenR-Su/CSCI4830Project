var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var { connectDB } = require('../config/dbconfig');

//get all appointments
router.get('/', (req, res) => {
    //connecting and querying db
    connectDB((connection) => {
        connection.query('select * from appointment', (err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).send(result);
        })
    })
})


//get appointment by id
router.get('/:apptid', (req, res) => {

    //getting calender id from params
    let id = req.params.apptid;

    //connecting and querying db
    connectDB((connection) => {
        connection.query('select * from appointment where `id` = ?', [id], (err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).send(result);
        })
    })
})

//get appt by employeeid
router.get('/fromemployee', (req, res) => {
    console.log('got here');
    let id = req.session.employeeid;

    connectDB((connection) => {
        connection.query('select * from appointment where `employeeid` = ?', [id], (err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).send(result);
        })
    })
})

//get appointment by clientid
router.get('/fromClient', (req, res) => {

    console.log('got to /fromClient');
    //getting clientID from session
    let id = req.session.clientID;
    console.log(id);

    // //connecting and querying db
    // connectDB((connection) => {
    //     connection.query('select * from appointment where `clientid` = ?', [id], (err, result) => {
    //         if(err){
    //             console.log(err);
    //         }
    //         res.status(200).send(result);
    //     })
    // })
})

//post appointment
router.post('/create', (req, res) => {
    let post = {
        freedayid : req.body.freedayid
    }

    request.get(`http://localhost:3000/freeday/`, (err, response) => {
        if(err){
            console.log(err);
        }

        // let jsonResponse = Object.values(JSON.parse(JSON.stringify(response.body)));
        // console.log('jsonResponse: ' + jsonResponse);
        let jsonResponse = JSON.parse(response.body);
        //console.log(jsonResponse[0].employeeid);

        connectDB((connection) => {
            connection.query(`insert into appointment (freedayid, employeeid, clientid, final) values
                ('${post.freedayid}', '${jsonResponse[0].employeeid}', '${req.session.clientID}', FALSE)`, (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    res.status(200).send(result);
                })
        })

    });
})




module.exports = router;