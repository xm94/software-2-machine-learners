var express = require("express");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test'); // Example for postgres
var analysts = require("./dao/analysts");
var transactionLogs = require("./dao/transactionLogs");
var events = require("./dao/events");
var systems = require("./dao/systems");
var tasks = require("./dao/tasks");
var subtasks = require("./dao/subtasks");
var findings = require("./dao/findings");
var app = express();

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
var taskRoutes = require("./routes/taskRoutes");
var subtaskRoutes = require("./routes/subtaskRoutes");
var findingRoutes = require("./routes/findingRoutes");
var reportRoutes = require("./routes/reportRoutes");
var notificationRoutes = require('./routes/notificationRoutes');
app.use(routes);
app.use(systemRoutes);
app.use(eventRoutes);
app.use(tlRoutes);
app.use(findingRoutes);
app.use(taskRoutes);
app.use(subtaskRoutes);
app.use(reportRoutes);
app.use(notificationRoutes);

/** Start local host */
app.listen(app.get("port"),async function(){
    console.log("Server started on port " + app.get("port"));
    console.log("Initialzing tables");
    analysts.initdb();
    transactionLogs.initdb();
    events.initdb();
    systems.initdb();
    tasks.initdb();
    subtasks.initdb();
    findings.initdb();
    console.log()
});