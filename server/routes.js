var express = require("express");
var bodyParser = require('body-parser')
var analysts = require("./routes/analysts");
var transactionLogs = require("./routes/transactionLogs");
var events = require("./routes/events");

const router = express.Router();
var jsonParser = bodyParser.json()

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

// router.get("/login", async function(req, res){
//   console.log("Getting login");
//   var user = await analysts.getFromInitials('XM');
//   console.log(user)
//   res.send(user);
// });

router.post("/login", jsonParser, async function(req, res){
    console.log("Attempting to login with initials " + req.body.initials);
    var user = await analysts.getFromInitials(req.body.initials);
    if(user){
        transactionLogs.insert({a_initials:req.body.initials,tl_action_performed: "Logged in", a_id:user.a_id});
    }
    res.send(user);
  });


router.post("/events",jsonParser, async function(req, res){
    console.log(req.body);
    console.log("Attempting to create event ");
    var event = await events.insert(req.body.event);
    if(event){
        var lead = events.addTeamMember(event.e_id,req.body.analyst.a_id);
        transactionLogs.insert({a_initials:req.body.analyst.initials,tl_action_performed: "Created New Event", a_id:req.body.analyst.a_id});
    }
    res.send(event);
});




router.get('/findEvent/:id', async function(req, res, next){
    console.log("Getting /findEvent{id}");

});

router.post("/putEvent", async function(req, res, next){
    console.log("Posting /putEvent");
    console.log(req.json);
});

router.put('/updateEvent/:id', async function(req, res, next){
    console.log("Getting /update");

})

router.delete("/deleteEvent/:id", async function(req, res, next){
    console.log("Deleting /delete");

})


module.exports = router;