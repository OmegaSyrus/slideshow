var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var handlebars = require('express-handlebars')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

serverip = process.env.OPENSHIFT_NODEJS_IP;
serverport = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('comp2406'));
app.use(session({secret: 'comp2406',
					saveUninitialized: true,
					resave: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/slideshow', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//image reference
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;


app.listen(serverport, serverip);

console.log('Static Express Server Running at http://127.0.0.1:3000  CNTL-C to quit');