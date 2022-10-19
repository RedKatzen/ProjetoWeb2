var express = require('express');
var router = express.Router();

var DBConn = require('../db-conn');
var db = new DBConn();

router.get('/', function (req, res, next) {
    
    db.findAllcontas((err, data) => {
        if (err) next(err)
        else res.render('contas/index', { contas: data });
    });
});




router.get('/signUp', function (req, res, next) {
    res.render('signUp');
  });
  
  router.post('/', function (req, res, next) {
  
    var errors = [];
    if (req.body.nome == "") {
      errors.push("Nome não informado.");
    }
  
    if (errors.length == 0) {
      db.createConta(req.body.nome, (err, data) => {
        if (err) next(err)
        else {
          db.getLastInsertRowId((err, data) => {
            res.redirect('/accounts/' + data['last_insert_rowid()'],);
          });
        }
      });
    } else {
      res.render('accounts/form', { "errors": errors });
    }
});