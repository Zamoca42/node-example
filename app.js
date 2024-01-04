const express = require('express');
const customerRoute = require('./route/customer'); //customer 라우트를 추가
const proudctRoute = require('./route/product');  //product 라우트를 추가
const app = express();
const port = 3000;

// 기본 HTTP 메서드 라우팅

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/customer', (req, res) => res.send('Hello Customer!'));

app.post('/customer', (req, res) => res.send('Hello Customer!'));

app.all('/customer', (req, res) => res.send('HTTP 요청 메소드 종류에 상관없이 응답!'));

// next() 함수를 이용한 미들웨어

app.get('/example', function(req, res, next) { 
  console.log('첫 번째 콜백'); 
  next(); // 다음 콜백 함수 호출 
}, function(req, res, next) { 
  console.log('두 번째 콜백'); 
  res.send('Hello from B!'); 
});

const ex0 = function (req, res, next) { 
  console.log('첫 번째 콜백'); 
  next(); 
};

const ex1 = function (req, res, next) { 
  console.log('두 번째 콜백 함수'); 
  next(); 
};

const ex2 = function (req, res, next) { 
  res.send('세 번째 콜백 함수'); // 클라이언트로 응답
};

app.get('/examples', [ex0, ex1, ex2]); // 콜백 함수 배열로 정의

// app.route를 이용한 HTTP 메서드 라우팅

app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

app. get('/error', function(req, res) { 
  throw new Error('에러 발생!'); // 라우트에서 에러가 발생하면 express가 알아서 처리 (500)
});

// 에러 처리 미들웨어
app.use(function (err, req, res, next) { 
  console.error(err.stack); 
  res.status(500).json({statusCode: 500, errMessage: err.message}); 
})

app.use('/customer', customerRoute); // customer 라우트를 /customer 경로로 사용
app.use('/product', proudctRoute); // product 라우트를 /product 경로로 사용
app.use(express.json({limit: '50mb'})); 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
