'use strict';
var express = require('express');
var cache = require('../cache');
var database = require('../database');
var router = express.Router();

router.post('/', function (req, res) {
  /*  database.insertOrReplaceEntity('purchaserecords', {
        PartitionKey: 'a',
        RowKey: 'productid',
        CustomKey: 'value'
    }, () => {*/
        res.send('available');
        res.end();
    //});
});

module.exports = router;
