var express = require("express");

const router = express.Router();

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

module.exports = router;