var express = require("express");
var bodyParser = require('body-parser');
var analysts = require("../dao/analysts");
var transactionLogs = require("../dao/transactionLogs");
var systems = require("../dao/systems");
var tasks = require("../dao/tasks");
var subtasks = require("../dao/subtasks");
var findings = require("../dao/findings");

const router = express.Router();
var jsonParser = bodyParser.json();

router.get('/findings/', async function(req, res, next){
    var findingList = await findings.getAll();
    res.send(findingList);
});

router.get('/findings/:id', async function(req, res, next){
    var finding = await findings.getFromId(req.params.id);
    res.send(finding);
});

router.get('/findings/event/:id', async function(req, res, next){
    var finding = await findings.getFromEventId(req.params.id);
    res.send(finding);
});

router.get('/findings/system/:id', async function(req, res, next){
    var finding = await findings.getFromSystemId(req.params.id);
    res.send(finding);
});

router.get('/findings/task/:id', async function(req, res, next){
    var finding = await findings.getFromTaskId(req.params.id);
    res.send(finding);
});

router.get('/findings/subtask/:id', async function(req, res, next){
    var finding = await findings.getFromSubtaskId(req.params.id);
    res.send(finding);
});

router.get('/findings/archive/:id', async function(req, res, next){
    var finding = await findings.getFromEventIdArchived(req.params.id);
    res.send(finding);
});

router.post("/findings",jsonParser, async function(req, res){
    // req.body.event.e_archived = false;
    console.log(req.body);
    for( m of req.body.finding.f_mitigations){
        console.log(m);
    }
    console.log("Attempting to create finding ");
    // req.body.event.e_assessment_date = new Date();
    // req.body.event.e_declassification_date = new Date();
    // req.body.analyst.a_initials = "EM"
    // var event = await events.insert(req.body.event);
    var finding = await findings.insert(req.body.finding,req.body.analyst.a_id);
    
    // if(event){
    //     var lead = events.addTeamMember(event.e_id,req.body.analyst.a_id);
    //     transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Created New Event", a_id:req.body.analyst.a_id});
    // }
    // res.send(event);
    res.status(200).send(finding);
});

router.put("/findings", jsonParser, async function(req,res){
    console.log(req.body);
    console.log("Attempting to create finding ");
    // req.body.event.e_assessment_date = new Date();
    // req.body.event.e_declassification_date = new Date();
    // req.body.analyst.a_initials = "EM"
    // var event = await events.insert(req.body.event);
    var finding = await findings.update(req.body.finding);
    
    // if(event){
    //     var lead = events.addTeamMember(event.e_id,req.body.analyst.a_id);
    //     transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Created New Event", a_id:req.body.analyst.a_id});
    // }
    // res.send(event);
    res.status(200).send(finding);
});

router.post("/findings/archive", jsonParser, async function(req,res){
    // req.body.event.e_archived = false;
    console.log(req.body);
    console.log("Attempting to archive finding ");
    // req.body.event.e_assessment_date = new Date();
    // req.body.event.e_declassification_date = new Date();
    // req.body.analyst.a_initials = "EM"
    // var event = await events.insert(req.body.event);
    var finding = await findings.archive(req.body.f_id);
    // if(event){
    //     var lead = events.addTeamMember(event.e_id,req.body.analyst.a_id);
    //     transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Created New Event", a_id:req.body.analyst.a_id});
    // }
    // res.send(event);
    res.status(200).send(finding);
});

module.exports = router;