var express = require("express");
var bodyParser = require('body-parser')
var transactionLogs = require("../dao/transactionLogs");
var events = require("../dao/events");

const router = express.Router();
var jsonParser = bodyParser.json();

router.get('/notifications/', async function(req, res, next){
    var notList = [
        {text:"Task 1 - assigned to XM - due in 3 Hours",timestamp:Date.now()},
        {text:"Task 3 Completed - by EM",timestamp:Date.now()},
        {text:"Task 2 - assigned to EM - due in 0 Hours",timestamp:Date.now()}
    ];
    res.send(notList);
});

module.exports = router;