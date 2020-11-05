var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var addUserRouter = require('./routes/addUser');
var userLoginRouter = require('./routes/userLogin');
var testAPIRouter = require("./routes/testAPI");
var database = require("./routes/database");
var updateProfile = require("./routes/updateProfile");
var updateProfile2 = require("./routes/updateProfile2");
var updateKin = require("./routes/updateKin");
var updateProfile5 = require("./routes/updateProfile5");
var addBodyFeature = require("./routes/addBodyFeature");
var getFeaturesList = require("./routes/getFeaturesList")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({credentials: true, origin: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (err) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    res.render('error');
  }
  next()
});

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "SESS_SECRET",
  cookie: {
    sameSite: true,
    proxy: true,
    maxAge: 1000 * 60 * 60 * 24 * 2, //two days
    secure: true,
    httpOnly: true
  }
}));

app.use('/', indexRouter);
app.use('/addUser/', addUserRouter);
app.use('/userLogin', userLoginRouter);
app.use("/testAPI", testAPIRouter);
app.use("/testDatabase", database);
app.use("/updateProfile", updateProfile);
app.use("/updateProfile2", updateProfile2);
app.use("/updateKin", updateKin);
app.use("/updateProfile5", updateProfile5);
app.use("/addBodyFeature", addBodyFeature);
app.use("/getFeaturesList", getFeaturesList)

app.get('*',  function (req, res) {
  res.status(404).send("Not Found")
});

module.exports = app;
