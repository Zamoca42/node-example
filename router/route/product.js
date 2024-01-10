const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
  res.send('product home page');
});

router.post('/insert', function(req, res) {
  res.send('products insert page');
});

router.put('/update', function(req, res) {
  res.send('products update page');
});

router.delete('/delete', function(req, res) {
  res.send('products delete page'); 
});

module.exports = router;