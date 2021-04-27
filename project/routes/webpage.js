var express = require('express');
var router = express.Router();
var path = require('path');
var { connectDB } = require('../config/dbconfig');

router.get('/', (req, res) => {
    res.sendFile('MainPage.html', {root:path.join(__dirname, '/../public')});
    
});

router.get('/aboutus', (req, res) => {
    res.sendFile('AboutUs.html', {root: path.join(__dirname, '/../public')});
});

router.get('/register', (req, res)=> {
    res.sendFile('Register.html', {root: path.join(__dirname, '/../public')});
})

router.get('/login', (req, res) => {
    res.sendFile('Login.html', {root: path.join(__dirname, '/../public')});
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).sendFile("MainPage.html", {root: path.join(__dirname, '/../public')})
})

module.exports = router;