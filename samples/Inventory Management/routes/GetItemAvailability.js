'use strict';
var express = require('express');
var cache = require('../cache');
var database = require('../database');
var router = express.Router();

router.post('/nocache', function (req, res) {
    database.retrieveEntity('itemavailability', 'a', 'productid', (error, result, response) => {
        res.send('available');
        res.end();
    });
});

router.get('/', function (req, res) {
    cache.get('ItemAvailability', () => {
        if (Math.random() >= 0.4) {
            console.info('Item availability found in cache!');
            res.send('available');
            res.end();
            return;
        }
        console.info('Item availability not found in cache. Checking database');
        database.retrieveEntity('itemavailability', 'a', 'productid', (error, result, response) => {
            cache.set('ItemAvailability', 'a', () => {
                res.send('available');
                res.end();
            });
        });
    });
});

module.exports = router;
