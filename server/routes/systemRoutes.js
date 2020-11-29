var express = require("express");
var bodyParser = require('body-parser')
var analysts = require("../dao/analysts");
var transactionLogs = require("../dao/transactionLogs");
var systems = require("../dao/systems")
const router = express.Router();
var jsonParser = bodyParser.json();

router.get('/systems/', async function(req, res, next){
    try{
        var systemList = await systems.getAll();
        res.send(systemList);
    } catch(err){
        res.status(500).send(err);
    }
});

router.get('/systems/:id', async function(req, res, next){
    try{
        var system = await systems.getFromId(req.params.id);
        if(!system){
            console.log("no system");
            return res.status(404).send("404 Not Found");
        }
        res.send(system);
    } catch(err){
        res.status(500).send(err);
    }
});

router.get('/systems/event/:id', async function(req, res, next){
    try{
        var system = await systems.getFromEventId(req.params.id);
        if(!system){
            console.log("no system");
            return res.status(404).send("404 Not Found");
        }
        res.send(system);
    } catch(err){
        res.status(500).send(err);
    }
});

router.post("/systems",jsonParser, async function(req, res){
    try{
        console.log(req.body);
        console.log("Attempting to create system ");
        const newSystem = await systems.insert(req.body.system);
        if(newSystem){
            transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Created New system", a_id:req.body.analyst.a_id});
        }
        console.log("new system");
        console.log(newSystem);
        res.send(newSystem);
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});


router.put("/systems/", jsonParser, async function(req, res, next){
    try{
        console.log(req.body);
        var updatedsystem = await systems.updatesystem(req.body.system.s_id,req.body.system);
        console.log("updated system response: " + updatedsystem);
        if(updatedSystem){
            transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: "Updated system " + req.body.system.s_id, a_id:req.body.analyst.a_id});
        }
        else{
            console.log();

        }
        res.send(req.body.system);
    } catch(err){
        res.status(500).send(err);
    }
});

router.put('/systems/archive', jsonParser, async function(req, res, next){
    try{
        console.log("inside try");
        if(console.body.analyst.a_role!="Lead Analyst"){
            transactionLogs.insert({a_initials:req.body.analyst.initials,tl_action_performed: "Attempted to archive system with insufficient permissions", a_id:req.body.analyst.a_id});
            return res.status(403).send("You must be a Lead Analyst to perform this task");
        }
        console.log(req.body);
        var system = await systems.getFromId(req.body.system.e_id);
        if(!system){
            console.log("no system");
            return res.status(404).send();
        }
        var archivedsystem = await systems.archivesystem(req.body.system.e_id);
        console.log("system response " + archivedsystem);
        if(archivedsystem){
            transactionLogs.insert({a_initials:req.body.analyst.initials,tl_action_performed: "Archived system", a_id:req.body.analyst.a_id});
        }
        else{
            console.log("error ");
        }
        res.status(200).send("archivedsystem");}
    catch(err){
        res.status(500).send(err);
    }
});

module.exports = router;