var express = require("express");
var bodyParser = require('body-parser');
var analysts = require("../dao/analysts");
var transactionLogs = require("../dao/transactionLogs");
var systems = require("../dao/systems");

const router = express.Router();
var jsonParser = bodyParser.json();

router.get('/analysts/', async function(req, res, next){
    var analystList = await analysts.getAll();
    res.send(analystList);
});

module.exports = router;