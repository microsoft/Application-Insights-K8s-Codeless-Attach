import fs = require("fs");
import https = require("https");
import { ContentProcessor } from "./ContentProcessor";
import { logger } from "./LoggerWrapper";

let options;
const port = process.env.port || 1337;

logger.info(`listening on port ${port}`);
try {
    options = {
        cert: fs.readFileSync("/mnt/webhook/cert.pem"),
        key: fs.readFileSync("/mnt/webhook/key.pem"),
    };
    logger.info("loaded certificates from /mnt");
} catch {
    options = {
        cert: fs.readFileSync("./../../server-cert.pem"),
        key: fs.readFileSync("./../../server-key.pem"),
    };
    logger.info("loaded certs from local");
}

https.createServer(options, (req, res) => {
    logger.info(`received request with url: ${req.url}, method: ${req.method}, content-type: ${req.headers["content-type"]}`);
    if (req.url === "/" && req.method === "POST" && req.headers["content-type"] === "application/json") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on("end", () => {
            const updatedConfig = ContentProcessor.TryUpdateConfig(body);
            logger.info("done processing request");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(updatedConfig);

        });
    } else {
        logger.error("unaccepable method, returning 404");
        res.writeHead(404);
        res.end();
    }

}).listen(port);
