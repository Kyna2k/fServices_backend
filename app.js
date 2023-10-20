require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const route = require('./src/routes/index');
const app = express();
const database = require('./src/config/database/index');
const session = require("express-session");
var hbs = require('hbs');
// view engine setup


hbs.registerHelper('pagination',function (n, block) {
  var accum = "";
  for (var i = 0; i < n; ++i) {
    accum += block.fn(i)
  };
  return accum; 
})


hbs.registerHelper('sum', function (n, option){
  return parseInt(n) + 1;
})


hbs.registerHelper('active', function (value, value2, result){
  var valueIn = parseInt(value2) + 1;
  if(value == valueIn)
  {
    return result
  }else {
    return ""
  }
})
hbs.registerHelper('selected', function (value, value2, result){
  if(value == value2)
  {
    return result
  }else {
    return ""
  }
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SECRETKEY,
      cookie: { maxAge: 15*60*1000 },
    })
  );

route(app);
database.connect();


module.exports = app;
