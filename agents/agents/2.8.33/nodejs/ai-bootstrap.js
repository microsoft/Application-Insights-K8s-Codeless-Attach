// const appInsights = require('applicationinsights');
const ikey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY;
const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
const setupString = connectionString || ikey;
const path = require('path');

if (setupString) {
    // TODO: log to etw the ikey used
    // TODO: check if applicationinsights/other modules are also present
    // TODO: potentially we should try loading using `require('applicationinsights')` to allow standard loader to search for already existing applicationinsights
    // TODO: make this script to create and maintain the status file, see https://mseng.visualstudio.com/AppInsights/_git/StatusMonitor/?path=%2FExtensions%2FExtension%2FExtensionStatus%2FStatusManager.cs&version=GBmaster&line=74
    // TODO: wrap init logic into try-catch and log errors, once loggin is implemented
    const appInsights = require(path.join(__dirname,'node_modules','applicationinsights'));

    appInsights.setup(setupString)
              .setAutoCollectRequests(true)
              .setSendLiveMetrics(true);
    
    if(process.env.APPLICATIONINSIGHTS_ROLE_NAME){
        appInsights.defaultClient.addTelemetryProcessor(envelope => {
            envelope.tags["ai.cloud.role"] = process.env.APPLICATIONINSIGHTS_ROLE_NAME;
        });
    }

    if(process.env.APPLICATIONINSIGHTS_ROLE_INSTANCE){
        appInsights.defaultClient.addTelemetryProcessor(envelope => {
            envelope.tags["ai.cloud.roleInstance"] = process.env.APPLICATIONINSIGHTS_ROLE_INSTANCE;
        });
    }
    
    
    appInsights.start();
} else {
  // TODO: log to etw that ikey is not set, hence attach is skipped
}
