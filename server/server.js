var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk("localhost/fric");
const fric = db.get('fric');

/** Set up express variable */
var app = express();

// Set the port to 4000
app.set("port", process.env.PORT || 4000);

/** Setup routes variable to connect with the routes.js file */
//var routes = require("./routes");
/** Include routes.js file */
// app.use(routes);

app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", async function(req,res,next){
    console.log("Getting /");
    try {
        const items = await fric.find({});
        res.json(items);
    } catch (error){
        next(error);
    }
})
app.get("/ping", function(req, res, next){
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
})

app.get("/login", (req, res) => {
  console.log("Getting login");
  res.send("ok");
});

app.post("/events", (req, res) => {
    console.log("Posting events");
    res.send("ok");
  });
/** Start local host */
app.listen(app.get("port"),function(){
    console.log("Server started on port " + app.get("port"));
});