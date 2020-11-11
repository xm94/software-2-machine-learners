var express = require("express");
var bodyParser = require('body-parser');
var analysts = require("../dao/analysts");
var transactionLogs = require("../dao/transactionLogs");
var systems = require("../dao/systems");
var tasks = require("../dao/tasks");
var subtasks = require("../dao/subtasks");
var findings = require("../dao/findings");
var events = require("../dao/events");
var riskmatrix = require("../utils/riskMatrix");


const router = express.Router();
var jsonParser = bodyParser.json();

router.get('/findings/', async function(req, res, next){
    var findingList = await findings.getAll();
    res.send(findingList);
});

router.get('/riskmatrix/:id', async function(req, res, next){
    var event = await events.getFromId(req.params.id);
    var report = await riskmatrix.generateFromEvent(event.e_id,event.e_name,event.e_type)
    res.send(report);
});


module.exports = router;