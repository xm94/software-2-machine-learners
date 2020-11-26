var express = require("express");
var bodyParser = require('body-parser')
var transactionLogs = require("../dao/transactionLogs");
var events = require("../dao/events");
var notifications = require('../dao//notifications');
const router = express.Router();
var jsonParser = bodyParser.json();

router.get('/notifications/', async function(req, res, next){
    var notList = await notifications.getAllForAnalyst(req.query.a_id);
    res.send(notList);
});

module.exports = router;