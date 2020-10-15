var express = require("express");
var bodyParser = require('body-parser')
var analysts = require("./dao/analysts");
var transactionLogs = require("./dao/transactionLogs");
var events = require("./dao/events");

const router = express.Router();
var jsonParser = bodyParser.json();

// Set up dependencies as objects


router.get("/", async function(req,res,next){
    console.log("Getting /");
    users = await analysts.getAll();
    console.log(users)
    res.send(users)
});

router.get("/ping", function(req, res, next){
    res.send("ping")
});

router.post("/login", jsonParser, async function(req, res){
    console.log("Attempting to login with initials " + req.body.initials);
    var user = await analysts.getFromInitials(req.body.initials);
    var updated = await analysts.updateLeadStatus(user.a_id,req.body.lead);
    var analystRole = req.body.lead ? "Lead Analyst" : "Analyst";
    if(user && updated){
        transactionLogs.insert({a_initials:req.body.initials,tl_action_performed: "Logged in as" + analystRole, a_id:user.a_id});
    }
    user = await analysts.getFromInitials(req.body.initials);
    res.send(user);
  });

module.exports = router;