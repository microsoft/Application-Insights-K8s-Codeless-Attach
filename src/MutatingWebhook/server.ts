import http = require('http');
var port = 45686
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Gocu\n');
}).listen(port);