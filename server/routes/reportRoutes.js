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
var finalTechnicalReport = require('../utils/finalTechnicalReport')
var fs = require('fs')


const router = express.Router();
var jsonParser = bodyParser.json();

router.get('/findings/', async function(req, res, next){
    var findingList = await findings.getAll();
    res.send(findingList);
});

router.get('/riskmatrix/:id', async function(req, res, next){
    var event = await events.getFromId(req.params.id);
    var report = await riskmatrix.generateFromEvent(event.e_id,event.e_name,event.e_type)
    res.send({'path':report});
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
    res.send({'path':report});
});

router.post('/final/', jsonParser,async function(req, res, next){
    console.log(req.body)
    var event = await events.getFromId(req.body.template.e_id);
    var team = await events.getAnalystsFromID(req.body.template.e_id);
    var teamNames = []
    for(a of team){
        a_name = a.a_fname + " " + a.a_lname;
        teamNames.push({"a_name":a_name});
    }
    var systemList = await systems.getFromEventId(req.body.template.e_id);
    var systemNames = [];
    var allFindings = [];
    for(s of systemList){
        systemNames.push(s.s_name);
        var findingList = await findings.getFromSystemId(s.s_id)
        for(f of findingList){
            allFindings.push(f)
        }
    }
    try{
        console.log("making docx");
        path = await finalTechnicalReport.generate(req.body.template,event,teamNames,systemNames,allFindings)
        res.send({'path':path});
    } catch(err){
        res.status(500).send(err);
    }
});


module.exports = router;