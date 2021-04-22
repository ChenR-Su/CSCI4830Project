var express = require('express');
var session = require('express-session');
var path = require('path');
var app = express();

//PORT
const port = 3000;

//getting routers
var clientRouter = require('./routes/client');
var employeeRouter = require('./routes/employee');
var calenderRouter = require('./routes/calender');

//bodyParsing module settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//setting up the sessions
app.use(session({
    secret: "secret"
}));


//hello world
app.get('/', (req, res) => {
    res.sendFile('MainPage.html', {root:path.join(__dirname, 'public')});
    
});

app.get('/aboutus', (req, res) => {
    res.sendFile('AboutUs.html', {root: path.join(__dirname, 'public')});
});

app.get('/register', (req, res)=> {
    res.sendFile('Register.html', {root: path.join(__dirname, 'public')});
})

app.get('/login', (req, res) => {
    res.sendFile('Login.html', {root: path.join(__dirname, 'public')});
})

//using custom middleware
app.use('/client', clientRouter);
app.use('/employee', employeeRouter);
app.use('/calender', calenderRouter);


//app is listening
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})