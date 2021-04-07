var express = require('express');
var app = express();
var mysql = require('mysql');

//PORT
const port = 3000;

//getting routers
var clientRouter = require('./routes/client');

//bodyParsing module
app.use(express.json());


//hello world
app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/client', clientRouter);



//GET clients
app.get('/clients', (req, res) => {

    //getting connection from pool and getting data
    pool.getConnection((err, connection) => {
        if(err){
            //throw err;
        }
        connection.query( 'select * from client' , (err, results) => {
            if(err){
                //throw err;
            }
            res.status(200).send(results);
        });

        connection.release();

    });

});


app.post('/clients', (req, res) => {

    //getting req body
    let post = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        username : req.body.username,
        password : req.body.password
    }

    //building query string
    let query = `insert into client (firstname, lastname, username, password) 
    values ('${post.firstname}', '${post.lastname}',
     '${post.username}', '${post.password}');`;

    //getting connection from pool and posting data
    pool.getConnection( (err, connection) => {
        if(err){
            //throw err;
        }
        connection.query(query, (err, result) => {
            if(err){
                //throw err;
            }
            res.status(200).send(result);
        })

        connection.release();
    });

})


app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})