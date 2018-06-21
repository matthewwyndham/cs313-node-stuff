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
  .get('/postal_calc', function(req, res) {
    var weight = parseFloat(req.query.weight);
    var type = req.query.type;
    var price = 0; // in cents
    if (type === "Letters (Stamped)") {
      if      (weight <= 1) {price = 50}
      else if (weight <= 2) {price = 71}
      else if (weight <= 3) {price = 92}
      else if (weight <= 3.5) {price = 113}
      else {price = -1}
    }
    if (type === "Letters (Metered)") {
      if      (weight <= 1) {price = 47}
      else if (weight <= 2) {price = 68}
      else if (weight <= 3) {price = 89}
      else if (weight <= 3.5) {price = 110}
      else {price = -1}
    }
    if (type === "Large Envelopes (Flats)") {
      if      (weight <=  1) {price = 100}
      else if (weight <=  2) {price = 121}
      else if (weight <=  3) {price = 142}
      else if (weight <=  4) {price = 163}
      else if (weight <=  5) {price = 184}
      else if (weight <=  6) {price = 205}
      else if (weight <=  7) {price = 226}
      else if (weight <=  8) {price = 247}
      else if (weight <=  9) {price = 268}
      else if (weight <= 10) {price = 289}
      else if (weight <= 11) {price = 310}
      else if (weight <= 12) {price = 331}
      else if (weight <= 13) {price = 352}
      else {price = -1}
    }
    if (type === "First-Class Package Service-Retail") {
      if      (weight <=  1) {price = 350}
      else if (weight <=  2) {price = 350}
      else if (weight <=  3) {price = 350}
      else if (weight <=  4) {price = 350}
      else if (weight <=  5) {price = 375}
      else if (weight <=  6) {price = 375}
      else if (weight <=  7) {price = 375}
      else if (weight <=  8) {price = 375}
      else if (weight <=  9) {price = 410}
      else if (weight <= 10) {price = 445}
      else if (weight <= 11) {price = 480}
      else if (weight <= 12) {price = 515}
      else if (weight <= 13) {price = 550}
      else {price = -1}
    }
    res.locals.weight = weight;
    res.locals.type = type;
    if (price != -1) {res.locals.price = "$" + String((price / 100).toFixed(2));}
    else {res.locals.price = "Please enter a valid weight!"}
    res.render('pages/postal_price');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
