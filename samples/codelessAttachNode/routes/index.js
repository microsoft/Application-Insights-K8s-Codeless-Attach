'use strict';
var express = require('express');
var router = express.Router();
var database = require('./../database');
var fetch = require('node-fetch');

/* GET home page. */
router.post('/', function (req, res) {
    let retriesPromise = [];
    let retries = req.body.RetryCount || 1;

    for(let i =0; i< retries; i++){
        retriesPromise.push(handleRequest(req,res));
    }

    return Promise.all(retriesPromise).then(values => {
        let status = 200;
        for (let i = 0; i < values.length; i++) {
            if (values[i].status != 200) {
                status = values[i].status;
            }
        }
        console.log('done')
        res.sendStatus(status);
        res.end();
    }).catch(ex => {
        res.sendStatus(500)
            res.end();
        console.log(`exception ${ex}`);
    });
})

/* GET home page. */
router.get('/spike', function (req, res) {
    return fetch("http://codeless-attach-java/spike").then(values => {
        let status = 200;
        for (let i = 0; i < values.length; i++) {
            if (values[i].status != 200) {
                status = values[i].status;
            }
        }
        console.log('done')
        res.sendStatus(status);
    }).catch(ex => {
        res.statusCode = 500;
        console.log(`exception ${ex}`);
    });
    res.end();
})

function handleRequest(req, res) {
    
    return new Promise((resolve, reject) => {
        console.log("received call");
        let delay = req.body.delay;
        if (!delay) {
            delay = 0;
        }
        console.log(`delay ${delay}`);
        setTimeout(resolve, delay);
    }).then(() => {
        let failureChance = req.body.FailureChance;
        res.statusCode = 200;
        console.log(`failure chance ${failureChance}`)
        if (failureChance > Math.random()) {
            res.statusCode = 400;
            reject("Failure");
        }
    }).then(() => {
        let promisses = [];
        let subsequentCalls = req.body.SubsequentCalls;
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        };
        promisses.push(fetch("http://codeless-attach-core/", options));
        promisses.push(fetch("http://codeless-attach-java/", options));
        console.log('queued calls to net and java');
        if (subsequentCalls) {
            for (let i = 0; i < subsequentCalls.length; i++) {
                if (subsequentCalls[i].Uri.startsWith('database')) {
                    promisses.push(DBSubsequentCall(subsequentCalls[i].Params))
                    console.log('queued call to database');
                } else if (subsequentCalls[i].Uri.startsWith('http')) {
                    promisses.push(fetch(subsequentCalls[i].Uri));
                    console.log(`queued call to ${subsequentCalls[i].Uri}`)
                }
            }
        };
        
        return Promise.all(promisses);
    }).then(values => {
        let status = 200;
        for (let i = 0; i < values.length; i++) {
            if (values[i].status > 299 ) {
                status = values[i].status;
            }
        }
        console.log('done')
        res.statusCode = status;
    }).catch(ex => {
        res.statusCode = 500;
        console.log (`exception ${ex}`);
    });
}

function DBSubsequentCall(param) {
    return new Promise((resolve, reject) => {
        return database.insertOrReplaceEntity('table1', param, (error, result, response) => {
            if (error) {
                resolve({ status: 500 })
            } else {
                resolve({ status: 200 });
            }
        });
    });
}

module.exports = router;
