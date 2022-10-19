const express = require('express')
var path = require('path');
const port = 3333

//instancia rota
var accountsRouter = require('./routes/accounts');
var indexRouter = require('./routes/index');
var signUpRouter = require('./routes/signUp')

var DBConn = require('./db-conn.js')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var db = new DBConn();

//registra rota 
app.use('/accounts', accountsRouter);
app.use('/', indexRouter)
app.use('/signUp', signUpRouter)

app.get('/', (req, res) => {
    res.render('index', {
        title: "Login Page"
    })
})

app.get('/signUp', (req, res) => {
    res.render('signUp', {
        title: "SignUp Page"
    })
})

/* app.get('/accountManager', (req, res) => {
    res.render('accounts/', {
        title: "Account Manager"
    })
}) */

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})


module.exports = app;