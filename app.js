require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
<<<<<<< HEAD
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/top-music-app', {useNewUrlParser: true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var favoritesRouter = require('./routes/favorites')
=======
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');
>>>>>>> setup db

var app = express();
app.use(cors());
mongoose.connect('mongodb://localhost/topmusicapp');


<<<<<<< HEAD
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
=======

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

>>>>>>> setup db

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/favorites', favoritesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
