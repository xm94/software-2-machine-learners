var express = require("express");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test'); // Example for postgres
var analysts = require("./dao/analysts");
var transactionLogs = require("./dao/transactionLogs");
var events = require("./dao/events");
var systems = require("./dao/systems");
var app = express();

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = {}; // or just '{}', an empty object

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


require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: '+add);
  })

/** Allow app to make external requests */
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Set the port to 4000
app.set("port", process.env.PORT || 4000);

/** Setup routes*/
var routes = require("./routes");
var systemRoutes = require("./routes/systemRoutes");
var eventRoutes = require("./routes/eventRoutes");
var tlRoutes = require("./routes/transactionLogRoutes");
app.use(routes);
app.use(systemRoutes);
app.use(eventRoutes);
app.use(tlRoutes);




/** Start local host */
app.listen(app.get("port"),async function(){
    console.log("Server started on port " + app.get("port"));
    console.log(results)
    console.log(results["en0"][0])
    console.log(nets)
    analysts.initdb();
    transactionLogs.initdb();
    events.initdb();
    systems.initdb();
});