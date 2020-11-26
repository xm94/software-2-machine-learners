var express = require("express");
var bodyParser = require('body-parser');
var analysts = require("../dao/analysts");
var transactionLogs = require("../dao/transactionLogs");
var systems = require("../dao/systems");
var events = require("../dao/events");
var tasks = require("../dao/tasks");
var notifications = require("../dao/notifications");
var configuration = require("../dao/configuration");

day = 86400000
hour = 3600000
minute = 60000
var units = {"M":minute,"H":hour,"D":day}

const router = express.Router();
var jsonParser = bodyParser.json();

function parseInterval(interval){
    var readableTime = ""
    var days = 0;
    var hours = 0;
    var minutes = 0;
    if(interval>units["D"]){
        days = interval/units["D"];
        interval = interval%units["D"];
    }
    if(interval>units["H"]){
        hours = interval/units["H"];
        interval = interval%units["H"];
    }
    if(interval>units["M"]){
        minutes = interval/units["M"];
    }
    if(days){
        readableTime = String(days) + " days"
    }
    if(hours){
        if(readableTime.length>0){
            readableTime = minutes ? readableTime + ", " + String(hours) + "hours, " : readableTime + " and " + String(hours) + " hours"
        }
        else{
            readableTime = String(hours) + " hours"
        }
    }
    if(minutes){
        if(readableTime.length>0){
            readableTime = readableTime + " and " + String(minutes) + " minutes"
        }
        else{
            readableTime = String(minutes) + " minutes"
        }
    }
    return readableTime;
}

router.get("/tasks", async function(req,res){
    var tasklist = await tasks.getAll();
    res.send(tasklist);
});

router.get('/tasks/:id', async function(req, res, next){
    var task = await tasks.getFromId(req.params.id);
    res.send(task);
});

router.post("/tasks",jsonParser, async function(req, res){
    // req.body.event.e_archived = false;
    console.log(req.body);
    console.log("Attempting to insert a task ");
    var task = await tasks.insert(req.body.task);
    if(task){
        var system = await systems.getFromId(task.s_id);
        var event = await events.getFromId(system.e_id);
        var config = await configuration.getFromId(event.e_id);
        console.log("task " + task.t_name + "created");
        if(config.c_notifications_enabled){
            console.log("generating notifications")
            var interval = config.c_n_duration/config.c_n_frequency;
            var firetime = new Date(task.t_due_date);
            for(var i = 1;i<=config.c_n_frequency;i++){
                console.log(interval);
                console.log(firetime);
                firetime -= interval;
                var n1 = await notifications.insert({
                    n_text:"Task " + task.t_name + " is due in " + parseInterval(i*interval),
                    n_fire_time:firetime,
                    n_recipient:event.e_lead,
                    n_task:task.t_id,
                    n_read:false,
                    n_archived:false
                });
                var n2 = await notifications.insert({
                    n_text:"Task " + task.t_name + " is due in " + parseInterval(i*interval),
                    n_fire_time:firetime,
                    n_recipient:task.a_id,
                    n_task:task.t_id,
                    n_read:false,
                    n_archived:false
                });
            }
        }
    }
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


//1 day
//
