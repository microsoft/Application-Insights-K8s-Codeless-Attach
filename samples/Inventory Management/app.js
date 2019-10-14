'use strict';
const
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log all requests (and fix .NET Core correlation)
app.use(function (req, res, next) {
    console.info("Incoming request: " + req.url);
    let ctx = res.getHeader("request-context").split(",")[0];
    res.setHeader("request-context", ctx);
    next();
});

// Simulate event loop issues
let lastDate = new Date(0);
app.use(function (req, res, next) {
    if (new Date().getMinutes() % 10 === 0 && ((new Date().getTime() - lastDate.getTime()) > 1000 * 60 * 5)) {
        console.info("Doing heavy CPU work");
        var stop = new Date().getTime();
        while (new Date().getTime() < stop + 6500) { /* Do nothing */ }
        lastDate = new Date();
    }
    next();
});

app.use('/', require('./routes/index'));
app.use('/getItemAvailability', require('./routes/GetItemAvailability'));
app.use('/reserveItem', require('./routes/ReserveItem'));
app.use('/markItemSold', require('./routes/MarkItemSold'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error(req.url + ': Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.send(err.message);
    res.end();
});


let port = process.env.PORT || 1337;
app.listen(port, () => console.log('Inventory Management listening on port ' + port));