'use strict';
var express = require('express');
var router = express.Router();
var database = require('./../database');
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function (req, res) {
    return new Promise((resolve, reject) => {
        let delay = req.body.delay;
        if (!delay) {
            delay = 0;
        }
        setTimeout(resolve, delay);
    }).then(() => {
        let failureChance = req.body.FailureChance;
        res.statusCode = 200;

        if (failureChance > Math.random()) {
            res.statusCode = 400;
            throw "Failure";
        }
    }).then(() => {
        let promisses = [];
        let subsequentCalls = req.body.SubsequentCalls;
        if (subsequentCalls) {
            for (let i = 0; i < subsequentCalls.length; i++) {
                if (subsequentCalls[i].Uri.startsWith('database')) {
                    promisses.push(DBSubsequentCall(subsequentCalls[i].Params))
                } else if (subsequentCalls[i].Uri.startsWith('http')) {
                    promisses.push(fetch(subsequentCalls[i].Uri));
                }
            }
            return Promise.all(promisses);
        }
    }).then(() => {
        res.end("OK");
    }).catch(ex => {
        res.end(ex)
    });
})

function DBSubsequentCall(param) {
    return new Promise((resolve, reject) => {
        return database.insertOrReplaceEntity('purchaserecords', param , () => {
            resolve();
        });
    });
}

module.exports = router;
