var express = require("express");
var transactionLogs = require("../dao/transactionLogs");

const router = express.Router();

router.get('/transactionlogs/', async function(req, res, next){
    var tlList = await transactionLogs.getAll();
    res.send(tlList);
});

router.get('/transactionlogs/:id', async function(req, res, next){
    var tl = await transactionLogs.getFromId(req.params.id);
    res.send(tl);
});

module.exports = router;