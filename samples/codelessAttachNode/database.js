const config = require('./config');
const azure = require('azure-storage'),
    tableSvc = azure.createTableService(config.AZURESTORAGE_CONNECTION.split(',')[0], config.AZURESTORAGE_CONNECTION.split(',')[1]);

module.exports = tableSvc;