var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const port = 3000;

var connection = mysql.createConnection({
    host : 'ec2-18-222-239-220.us-east-2.compute.amazonaws.com',
    user : 'newmysqlremoteuser',
    password : 'password',
    database : 'semesterProject'
})

var jsonParser = bodyParser.json();


app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/test', (req, res) => {
    connection.connect();
    connection.query('select * from client', function(err, results, fields)  {
        if(err){
            console.log(err);
        }
        res.status(200).send(results);
    });
    connection.end();
})

app.post('/test', (req, res) => {
    let post = [
        ['example', 'customer2', 'customer2', 'password']
    ]


    var statement = 'insert into client (firstname, lastname, username, password) values ?';
    connection.connect();

    connection.query(statement, [post], function(err, result) {
        if(err){
            console.log(err);
        }

        console.log('inserted values into the table');
        res.status(200).send(result);
    })

    connection.end();
})


app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})