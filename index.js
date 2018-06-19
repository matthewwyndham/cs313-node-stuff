const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/math', function (req, res) {
    var lhs = parseFloat(req.query.lhs);
    var rhs = parseFloat(req.query.rhs);
    var operator = req.query.operator;
    var result = 0;
    if (operator === "plu") {result = lhs + rhs;}
    if (operator === "min") {result = lhs - rhs;}
    if (operator === "div") {result = lhs / rhs;}
    if (operator === "mul") {result = lhs * rhs;}
    res.locals.result = result;
    res.render('pages/math');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
