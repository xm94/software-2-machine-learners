var express = require("express");
var bodyParser = require('body-parser')
var transactionLogs = require("../dao/transactionLogs");
var events = require("../dao/events");
var configuration = require("../dao/configuration")

const router = express.Router();
var jsonParser = bodyParser.json();


router.post("/events",jsonParser, async function(req, res){
    req.body.event.e_archived = false;
    console.log(req.body);
    console.log("Attempting to create event ");
    req.body.event.e_assessment_date = new Date();
    req.body.event.e_declassification_date = new Date();
    req.body.analyst.a_initials = "EM"
    var event_post = req.body.event
    event_post['e_lead'] = req.body.analyst.a_id;
    var event = await events.insert(req.body.event);
    console.log(event);
    console.log("printing even");
    if(event){
        var lead = events.addTeamMember(event.e_id,req.body.analyst.a_id);
        transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Created New Event", a_id:req.body.analyst.a_id});
        configuration.insert({
            c_f_types:"{Credentials Complexity,Manufacturer Default Creds",
            c_f_classifications:"Vulnerability,Information",
            c_posture_types:"Insider,Insider-nearsider,Outsider,Nearsider,Nearsider-outsider",
            c_e_types:"Cooperative Vulnerability Penetration Assessment (CVPA))",
            c_e_classifications:"Top Secret,Secret, Confidential,Classified,Unclassified",
            c_notifications_enabled:true,
            c_n_duration:432000000,
            c_n_frequency:5,
            e_id: event.e_id
        })
    }
    res.send(event);
});


router.get('/events/', async function(req, res, next){
    var eventList = await events.getAll();
    res.send(eventList);
});

router.get('/events/:id', async function(req, res, next){
    var event = await events.getFromId(req.params.id);
    res.send(event);
});

router.get('/events/:id/config', async function(req, res, next){
    var config = await configuration.getFromId(req.params.id);
    res.send(config);
});

router.put("/events/", jsonParser, async function(req, res, next){
    console.log(req.body);
    var updatedEvent = await events.updateEvent(req.body.event.e_id,req.body.event);
    if(updatedEvent){
        transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Updated Event", a_id:req.body.analyst.a_id});
    }
    console.log("updated event response: " + updatedEvent);
    res.send(req.body.event);
});

//update notification settings
router.put("/events/notifications", jsonParser, async function(req, res, next){
    console.log(req.body);
    var updatedConfig = await configuration.updateNotifications(req.body.e_id,req.body)
    if(updatedConfig){
        transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Updated Config", a_id:req.body.analyst.a_id});
    }
    console.log("updated event response: " + updatedConfig);
    res.send(req.body.event);
});

router.put('/events/archive', jsonParser, async function(req, res, next){
    console.log("outside try");
    try{
        console.log("inside trty");
        console.log(req.body);
        var event = await events.getFromId(req.body.event.e_id);
        if(!event){
            console.log("no event");
            return res.status(404).send();
        }
        var archivedEvent = await events.archiveEvent(req.body.event.e_id);
        console.log("event response " + archivedEvent);
        if(archivedEvent){
            transactionLogs.insert({a_initials:req.body.analyst.initials,tl_action_performed: "Archived Event", a_id:req.body.analyst.a_id});
        }
        else{
            console.log("error ");
        }
        res.status(200).send("archivedEvent");}
    catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;