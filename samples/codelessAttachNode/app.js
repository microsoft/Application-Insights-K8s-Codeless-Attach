'use strict';
const
    express = require('express'),
    bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error(req.url + ': Not Found');
    err.status = 404;
    next(err);
});

let port = process.env.PORT || 1337;
app.listen(port, () => console.log('Inventory Management listening on port ' + port));