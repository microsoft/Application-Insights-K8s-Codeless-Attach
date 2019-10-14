'use strict';
var express = require('express');
var cache = require('../cache');
var database = require('../database');
var router = express.Router();

router.post('/', function (req, res) {
    database.insertOrReplaceEntity('itemavailability', {
        PartitionKey: 'a',
        RowKey: 'productid',
        CustomKey: 'value'
    }, () => {
        cache.set('ItemAvailability', 'a', () => {
            res.send('available');
            res.end();
        });
    });
});

module.exports = router;
