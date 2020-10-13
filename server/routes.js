var express = require("express");

const router = express.Router();

// Set up dependencies as objects


router.get("/", async function(req,res,next){
    console.log("Getting /");
    try {
        const items = await fric.find({});
        res.json(items);
    } catch (error){
        next(error);
    }
});

router.get("/ping", function(req, res, next){
    try {
        console.log("Getting ping try");
        // const items = await fric.find({});
        // res.json(items);
        res.json("[]");
        return;
    } catch (error){
        console.log("Getting ping error");
        console.log("Error");
        console.log(error);
        res.write("ERROR from catch statement");
    }
});

router.get("/login", (req, res) => {
  console.log("Getting login");
  res.send("ok");
});

router.post("/events", (req, res) => {
    console.log("Posting events");
    res.send("ok");
});




router.get('/findEvent/:id', async function(req, res, next){
    console.log("Getting /findEvent{id}");

});

router.post("/putEvent", async function(req, res, next){
    console.log("Posting /testPut");

});

router.put('/updateEvent/:id', async function(req, res, next){
    console.log("Getting /update");

})

router.delete("/deleteEvent/:id", async function(req, res, next){
    console.log("Deleting /delete");

})


module.exports = router;