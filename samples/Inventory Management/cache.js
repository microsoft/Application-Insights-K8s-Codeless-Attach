const config = require('./config');
const redis = require("redis"),
    client = redis.createClient(config.REDIS_CONNECTION);

client.on("error", function (err) {
    console.error("Error " + err);
});

module.exports = client;