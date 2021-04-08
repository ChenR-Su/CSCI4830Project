var express = require('express');
var app = express();

//PORT
const port = 3000;

//getting routers
var clientRouter = require('./routes/client');
var employeeRouter = require('./routes/employee');
var calenderRouter = require('./routes/calender');

//bodyParsing module
app.use(express.json());


//hello world
app.get('/', (req, res) => {
    res.send('hello world')
})

//using custom middleware
app.use('/client', clientRouter);
app.use('/employee', employeeRouter);
app.use('/calender', calenderRouter);


app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})