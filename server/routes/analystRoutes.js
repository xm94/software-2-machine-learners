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

router.get('/analysts/:id', async function(req, res, next){
    try{
        var analyst = await analysts.getFromId(req.params.id);
        if(!analyst){
            console.log("no analyst");
            return res.status(404).send("404 Not Found");
        }
        res.send(analyst);
    } catch(err){
        res.status(500).send(err);
    }
});

module.exports = router;