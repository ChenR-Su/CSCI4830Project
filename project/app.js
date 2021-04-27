var express = require('express');
var session = require('express-session');
var path = require('path');
var app = express();

//PORT
const port = 3000;

//getting routers
var clientRouter = require('./routes/client');
var employeeRouter = require('./routes/employee');
var freedayRouter = require('./routes/freeday');
var webpageRouter = require('./routes/webpage')

//bodyParsing module settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


//setting up the sessions
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))


//using custom middleware
app.use('/client', clientRouter);
app.use('/employee', employeeRouter);
app.use('/freeday', freedayRouter);
app.use('/', webpageRouter);


//app is listening
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})