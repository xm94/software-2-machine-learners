var express = require("express");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test'); // Example for postgres
var analysts = require("./routes/analysts");
var transactionLogs = require("./routes/transactionLogs");
var events = require("./routes/events");
var systems = require("./routes/systems");
var app = express();




// Set the port to 4000
app.set("port", process.env.PORT || 4000);

/** Setup routes variable to connect with the routes.js file */
var routes = require("./routes");
const { Events } = require("pg");
/** Include routes.js file */
app.use(routes);

/** Allow app to make external requests */
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/** Start local host */
app.listen(app.get("port"),async function(){
    console.log("Server started on port " + app.get("port"));
    analysts.initdb();
    transactionLogs.initdb();
    events.initdb();
    systems.initdb();
});