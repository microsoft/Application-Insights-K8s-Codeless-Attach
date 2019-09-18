import https = require('https');
import { ContentProcessor } from './ContentProcessor';
const fs = require('fs');

var port = process.env.port || 1337;
console.log(`listening on port ${port}`)

let options;

try {
    options = {
        key: fs.readFileSync('/etc/webhook/key.pem'),
        cert: fs.readFileSync('/etc/webhook/cert.pem')
    };
} catch{
    options = {
        key: fs.readFileSync('./server-key.pem'),
        cert: fs.readFileSync('/server-cert.pem')
    };
}

https.createServer(options, function (req, res) {
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