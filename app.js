require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const route = require('./src/routes/index');
const app = express();
const database = require('./src/config/database/index');
const session = require("express-session");


// view engine setup
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
