var express = require("express");
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres

/** Set up express variable */
var app = express();
app.use(bodyParser.json());

// Set the port to 4000
app.set("port", process.env.PORT || 4000);

/** Setup routes variable to connect with the routes.js file */
var routes = require("./routes");
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
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
});