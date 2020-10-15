var express = require("express");
var transactionLogs = require("../dao/transactionLogs");
var bodyParser = require('body-parser')

const router = express.Router();
var jsonParser = bodyParser.json();

router.get('/transactionlogs/', async function(req, res, next){
    var tlList = await transactionLogs.getAll();
    res.send(tlList);
});

router.get('/transactionlogs/:id', async function(req, res, next){
    var tl = await transactionLogs.getFromId(req.params.id);
    res.send(tl);
});

router.post('/transactionlogs/',jsonParser, async function(req, res){
    console.log(req.body);
    //body.analyst && body.action
    console.log("Attempting to create event ");
    var tl = await transactionLogs.insert({a_initials:req.body.analyst.a_initials,tl_action_performed: req.body.action, a_id:req.body.analyst.a_id});
    res.send(tl);
});

module.exports = router;