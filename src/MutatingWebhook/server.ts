import http = require('http');
import { ContentProcessor } from './ContentProcessor';
var port = 45686
http.createServer(function (req, res) {
    if (req.url === "/" && req.method === 'POST' && req.headers["content-type"] === 'application/json') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            let updatedConfig = ContentProcessor.TryUpdateConfig(body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(updatedConfig);
        });
    } else {
        res.writeHead(404);
        res.end();
    }

}).listen(port);

