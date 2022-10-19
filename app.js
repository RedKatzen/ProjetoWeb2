const express = require('express')
var path = require('path');
const port = 3333
app.set('view engine', 'ejs')

var DBConn = require('./db-conn.js')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var db = new DBConn();

//instancia rota
var accountsRoute = require('./routes/accounts');

//registra rota 
app.use('/accounts', accountsRoute);

app.get('/', (req, res) => {
    res.render('pages/index', {
        title: "Login Page"
    })
})

app.get('/signUp', (req, res) => {
    res.render('views/signUp', {
        title: "SignUp Page"
    })
})

app.get('/accountManager', (req, res) => {
    res.render('views/accounts/', {
        title: "Account Manager"
    })
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})


module.exports = app;