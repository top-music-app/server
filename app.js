require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/top-music-app', {useNewUrlParser: true});

var countryRouter = require('./routes/country');
var indexRouter = require('./routes/index');
var favoritesRouter = require('./routes/favorites')
var worldwideRouter = require('./routes/worldwide')

var app = express()

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/favorites', favoritesRouter);
app.use('/country', countryRouter);
app.use('/worldwide', worldwideRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
// });

module.exports = app;
