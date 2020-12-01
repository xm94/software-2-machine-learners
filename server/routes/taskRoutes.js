var express = require("express");
var bodyParser = require('body-parser');
var analysts = require("../dao/analysts");
var transactionLogs = require("../dao/transactionLogs");
var systems = require("../dao/systems");
var tasks = require("../dao/tasks");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

const router = express.Router();
var jsonParser = bodyParser.json();

router.get("/tasks", async function(req,res){
    var tasklist = await tasks.getAll();
    res.send(tasklist);
});

router.get('/tasks/:id', async function(req, res, next){
    var task = await tasks.getFromId(req.params.id);
    res.send(task);
});

router.get('/tasks/event/:id', async function(req, res, next){
    var task = await tasks.getFromEventId(req.params.id);
    res.send(task);
});

router.get('/tasks/system/:id', async function(req, res, next){
    var task = await tasks.getFromSystemId(req.params.id);
    res.send(task);
});

router.get('/tasks/archive/:id', async function(req, res, next){
    var task = await tasks.getFromEventIdArchived(req.params.id);
    res.send(task);
});

router.post("/tasks",upload.any(), async function(req, res){
    // req.body.event.e_archived = false;
    console.log(req.body);
    console.log(req.files);
    console.log("Attempting to insert a task ");
    // req.body.event.e_assessment_date = new Date();
    // req.body.event.e_declassification_date = new Date();
    // req.body.analyst.a_initials = "EM"
    // var event = await events.insert(req.body.event);
    req.body.t_attachments=[]
    for( f of req.files){
        req.body.t_attachments.push(f);
    }
    if(!req.body.t_collaborators){
        req.body.t_collaborators=[];
    }
    else if(typeof req.body.t_collaborators === 'string'){
        console.log("is string");
        var collaborators=[req.body.t_collaborators];
        req.body.t_collaborators=collaborators;
    }
    if(!req.body.t_associations){
        req.body.t_associations=[];
    }
    else if(typeof req.body.t_associations === 'string'){
        console.log("is string");
        var associations=[req.body.t_associations];
        req.body.t_associations=associations;
    }
    var task = await tasks.insert(req.body);
    
    // if(event){
    //     var lead = events.addTeamMember(event.e_id,req.body.analyst.a_id);
    //     transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Created New Event", a_id:req.body.analyst.a_id});
    // }
    // res.send(event);
    res.status(200).send(task);
});

router.put("/tasks", jsonParser, async function(req,res){
    console.log(req.body);
    console.log("Attempting to update task ");
    // req.body.event.e_assessment_date = new Date();
    // req.body.event.e_declassification_date = new Date();
    // req.body.analyst.a_initials = "EM"
    // var event = await events.insert(req.body.event);
    var task = await tasks.update(req.body.task);
    
    // if(event){
    //     var lead = events.addTeamMember(event.e_id,req.body.analyst.a_id);
    //     transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Created New Event", a_id:req.body.analyst.a_id});
    // }
    // res.send(event);
    res.status(200).send(task);
});

router.put("/tasks/archive", jsonParser, async function(req,res){
    // req.body.event.e_archived = false;
    console.log(req.body);
    console.log("Attempting to archive task ");
    // req.body.event.e_assessment_date = new Date();
    // req.body.event.e_declassification_date = new Date();
    // req.body.analyst.a_initials = "EM"
    // var event = await events.insert(req.body.event);
    var task = await tasks.archive(req.body.t_id);
    // if(event){
    //     var lead = events.addTeamMember(event.e_id,req.body.analyst.a_id);
    //     transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Created New Event", a_id:req.body.analyst.a_id});
    // }
    // res.send(event);
    res.status(200).send(task);
});




module.exports = router;