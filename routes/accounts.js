var express = require('express');
var router = express.Router();

var DBConn = require('../db-conn');
var db = new DBConn();

router.get('/', function (req, res, next) {
    
    db.findAllcontas((err, data) => {
        if (err) next(err)
        else res.render('accounts/index', { accounts: data });
    });
});

/* GET Nova conta */

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

/* Editar conta */

router.post('/:id', function (req, res, next) {

  var errors = [];
  if (req.body.nome == "") {
    errors.push("Nome não informado.");
  }

  if (errors.length == 0) {
    db.updateConta(req.body.id, req.body.nome, (err, data) => {
      if (err) next(err)
      else {
        res.redirect('/accounts/' + req.body.id);
      }
    });
  } else {
    res.render('accounts/edit', { "account": account, "errors": errors });
  }
});

/* Deletar conta */

router.post('/delete/:id', function (req, res, next) {

  db.deleteConta(req.params.id, (err, data) => {
    if (err) next(err)
    else {
      res.redirect('/accounts/');
    }
  });
});

/* Encontrar conta */

router.get('/:id', function (req, res, next) {

  db.GetContaById(req.params.id, (err, data) => {
    if (err) next(err)
    else if (!data) res.status(404).send('Conta não encontrada.');
    else res.render('accounts/detail', { accounts: data });
  });

});

router.get('/edit/:id', function (req, res, next) {

  db.GetContaById(req.params.id, (err, data) => {
    if (err) next(err)
    else if (!data) res.status(404).send('Conta não encontrada.');
    else res.render('accounts/edit', { accounts: data });
  });
});

/* Rota para a exclusão de uma conta */
router.post('/delete/:id', function(req, res, next) {
  res.send('Funcionou');
});

module.exports = router;