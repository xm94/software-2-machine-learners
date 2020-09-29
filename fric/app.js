var express = require("express");
var path = require("path");
var expressValidator = require("express-validator");
var expressSession = require("express-session");

/** Set up express variable */
var app = express();

// Set the port to 4000
app.set("port", process.env.PORT || 4000);

// Add views folder to directory
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

/** Setup routes variable to connect with the routes.js file */
//var routes = require("./routes");
/** Include routes.js file */
// app.use(routes);

app.use(express.static(path.join(__dirname,'./dist/fric')));
/** Start local host */
app.listen(app.get("port"),function(){
    console.log("Server started on port " + app.get("port"));
});