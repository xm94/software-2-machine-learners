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
app.get("/ping", async (req, res) => {
    try {
        console.log("Getting ping try");
        const items = await fric.find({});
        res.json(items);
    } catch (error){
        console.log("Getting ping error");
        console.log("Error");
    }
    res.send("ok");
});

app.get("/login", (req, res) => {
  res.send("ok");
});

app.post("/events", (req, res) => {
    res.send("ok");
  });
/** Start local host */
app.listen(app.get("port"),function(){
    console.log("Server started on port " + app.get("port"));
});