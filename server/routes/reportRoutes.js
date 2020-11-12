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
var erb = require("../utils/erb");


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

router.get('/erb/:id', async function(req, res, next){
    var event = await events.getFromId(req.params.id);
    var team = await events.getAnalystsFromID(req.params.id);
    var lead = team[0];
    var titles = await analysts.getTitlesFromId(lead.a_id);
    var leadTitle = ""
    for(t of titles){
        leadTitle = leadTitle + t.a_title + ", ";
    }
    if(leadTitle.length>0){
        leadTitle = leadTitle.substring(0,(leadTitle.length-2))
    }
    var a_name = lead.a_fname + " " + lead.a_lname;
    var report = await erb.generateFromEvent(event.e_id,event.e_name,event.e_type,a_name,leadTitle);
    res.send(report);
});


module.exports = router;