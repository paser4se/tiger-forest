var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var multipart = require('connect-multiparty');

var settings = require('./settings');
var routes = require('./routes/index');

var app = express();

app.set('port', process.env.PORT||8080);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

app.use(favicon());
// app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(multipart({ uploadDir: './public/images' }));
app.use(cookieParser());

app.use(session({
    secret: settings.cookieSecret,
    key: settings.db, // cookie name
    cookie: {maxAge: 1000 * 60 * 60}, // 1 hour
    store: new MongoStore({
        db: settings.db
    })
}));

app.use(express.static(path.join(__dirname, 'public')));

routes(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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

http.createServer(app).listen(app.get('port'), function(){
    console.log('Exprss server listening on port ' + app.get('port'));
});

module.exports = app;
