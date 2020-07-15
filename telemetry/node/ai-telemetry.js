const ikey = process.env.TELEMETRY_IKEY;
const connectionString = process.env.TELEMETRY_CONN_STRING;
const setupString = connectionString || ikey ;
const path = require('path');

console.log("hello world from second agent!");
if (setupString) {
    const appInsights = require(path.join(__dirname, 'node_modules', 'applicationinsights'));

    appInsights.setup(setupString)
        .setAutoCollectRequests(false)
        .setSendLiveMetrics(false);
    console.log("starting agent telemetry uploader");
    appInsights.start();
} else {
    // TODO: log to etw that ikey is not set, hence attach is skipped
}
