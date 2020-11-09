var express = require("express");
var bodyParser = require('body-parser')
var analysts = require("./dao/analysts");
var transactionLogs = require("./dao/transactionLogs");
const { networkInterfaces } = require('os');

const router = express.Router();
var jsonParser = bodyParser.json();

//Set up IP Address
const nets = networkInterfaces();
const results = {};

const tables = ["analysts","events","transactionlogs"];

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        if (net.family === 'IPv4') {
            if (!results[name]) {
                results[name] = [];
            }

            results[name].push(net.address);
        }
    }
}


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
    var updated2 = await analysts.updateIP(user.a_id,results["en0"][0]);
    var analystRole = req.body.lead ? "Lead Analyst" : "Analyst";
    if(user && updated){
        transactionLogs.insert({a_initials:req.body.initials,tl_action_performed: "Logged in as " + analystRole, a_id:user.a_id});
    }
    user = await analysts.getFromInitials(req.body.initials);
    res.send(user);
  });


  router.get("/table", async function(req, res){
      var table = {};
      table["analysts"]=await analysts.getAll();
      res.send(table);
  })

module.exports = router;