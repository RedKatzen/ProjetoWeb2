const express = require('express')
const app = express()
const port = 3333
app.set('view engine', 'ejs')

var eventosRouter = require('./routes/accounts');


app.get('/', (req, res) => {
    res.render('pages/index', {
        title: "Login Page"
    })
})

app.get('/signUp', (req, res) => {
    res.render('pages/signUp', {
        title: "SignUp Page"
    })
})

app.get('/accountManager', (req, res) => {
    res.render('pages/accounts/', {
        title: "Account Manager"
    })
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
  })