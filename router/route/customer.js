// express.Router()를 이용한 라우팅 분리
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('customer home page');
});

router.post('/insert', function(req, res) {
  res.send('customers insert page');
});

router.put('/update', function(req, res) {
  res.send('customers update page');
});

router.delete('/delete', function(req, res) {
  res.send('customers delete page');
});

module.exports = router;