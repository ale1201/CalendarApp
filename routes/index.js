var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// CON JOI NPM SE VALIDAN ESQUEMAS QUE CUMPLAN CONDICIONES 

module.exports = router;
