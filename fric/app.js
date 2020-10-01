var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require('mongoose');
var expressValidator = require("express-validator");
var expressSession = require("express-session");

var db = mongo.connect("mongodb://localhost:27017/AnglarCRUD", function(err, response){
    if(err){ console.log(err); }
    else { console.log('Connected to',db,'+',response); }
})

/** Set up express variable */
var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

});

var Schema = mongo.Schema;


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