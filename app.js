var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var morgan = require('morgan');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
var path = require('path');
var cookieParser = require('cookie-parser');

const { logs } = require('./vars.config');
var grant = require('grant-express');
var config = require('./grant.config.js');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();
app.use(morgan(logs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(grant(config));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
