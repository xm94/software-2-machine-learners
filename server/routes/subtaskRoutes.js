var express = require("express");
var bodyParser = require('body-parser');
var analysts = require("../dao/analysts");
var transactionLogs = require("../dao/transactionLogs");
var systems = require("../dao/systems");
var subtasks = require("../dao/subtasks");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

const router = express.Router();
var jsonParser = bodyParser.json();


router.get("/subtasks", async function(req,res){
    var subtasklist = await subtasks.getAll();
    res.send(subtasklist);
});

router.get('/subtasks/:id', async function(req, res, next){
    var subtask = await subtasks.getFromId(req.params.id);
    res.send(subtask);
});

router.get('/subtasks/event/:id', async function(req, res, next){
    var subtask = await subtasks.getFromEventId(req.params.id);
    res.send(subtask);
});

router.get('/subtasks/system/:id', async function(req, res, next){
    var subtask = await subtasks.getFromSystemId(req.params.id);
    res.send(subtask);
});

router.get('/subtasks/task/:id', async function(req, res, next){
    var subtask = await subtasks.getFromTaskId(req.params.id);
    res.send(subtask);
});

router.get('/subtasks/archive/:id', async function(req, res, next){
    var subtask = await subtasks.getFromEventIdArchived(req.params.id);
    res.send(subtask);
});

router.post("/subtasks",upload.any(), async function(req, res){
    // req.body.event.e_archived = false;
    console.log(req.body);
    console.log(req.files);
    console.log("Attempting to create finding ");
    // req.body.event.e_assessment_date = new Date();
    // req.body.event.e_declassification_date = new Date();
    // req.body.analyst.a_initials = "EM"
    // var event = await events.insert(req.body.event);
    req.body.st_attachments=[]
    for( f of req.files){
        req.body.st_attachments.push(f);
    }
    if(!req.body.st_collaborators){
        req.body.st_collaborators=[];
    }
    else if(typeof req.body.st_collaborators === 'string'){
        console.log("is string");
        var collaborators=[req.body.st_collaborators];
        req.body.st_collaborators=collaborators;
    }
    if(!req.body.st_associations){
        req.body.st_associations=[];
    }
    else if(typeof req.body.st_associations === 'string'){
        console.log("is string");
        var associations=[req.body.st_associations];
        req.body.st_associations=associations;
    }

    var subtask = await subtasks.insert(req.body);
    if(subtask){
        transactionLogs.insert({a_initials:req.body.analyst_initials,tl_action_performed: "Created New Subtask", a_id:req.body.analyst_id});
    }
    
    // if(event){
    //     var lead = events.addTeamMember(event.e_id,req.body.analyst.a_id);
    //     transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Created New Event", a_id:req.body.analyst.a_id});
    // }
    // res.send(event);
    res.status(200).send(subtask);
});

router.put("/subtasks", jsonParser, async function(req,res){
    console.log(req.body);
    console.log("Attempting to update subtask ");
    // req.body.event.e_assessment_date = new Date();
    // req.body.event.e_declassification_date = new Date();
    // req.body.analyst.a_initials = "EM"
    // var event = await events.insert(req.body.event);
    var subtask = await subtasks.update(req.body.subtask);
    
    // if(event){
    //     var lead = events.addTeamMember(event.e_id,req.body.analyst.a_id);
    //     transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Created New Event", a_id:req.body.analyst.a_id});
    // }
    // res.send(event);
    res.status(200).send(subtask);
});

router.put("/subtasks/archive/:st_id", jsonParser, async function(req,res){
    // req.body.event.e_archived = false;
    console.log(req.body);
    console.log("Attempting to archive subtask ");
    // req.body.event.e_assessment_date = new Date();
    // req.body.event.e_declassification_date = new Date();
    // req.body.analyst.a_initials = "EM"
    // var event = await events.insert(req.body.event);
    var subtask = await subtasks.archive(req.params.st_id);
    // if(event){
    //     var lead = events.addTeamMember(event.e_id,req.body.analyst.a_id);
    //     transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Created New Event", a_id:req.body.analyst.a_id});
    // }
    // res.send(event);
    res.status(200).send(subtask);
});

module.exports = router;