var express = require("express");
const monk = require('monk');
const Joi = require('@hapi/joi');

const router = express.Router();

// Set up dependencies as objects
const db = monk("localhost/fric");
const fric = db.get('fric');

const schema = Joi.object({
    name: Joi.string().trim().required(),
    otherParameter: Joi.string().trim().required()
});


router.get("/", async function(req,res,next){
    console.log("Getting /");
    try {
        const items = await fric.find({});
        res.json(items);
    } catch (error){
        next(error);
    }
});

router.get("/ping", function(req, res, next){
    try {
        console.log("Getting ping try");
        // const items = await fric.find({});
        // res.json(items);
        res.json("[]");
        return;
    } catch (error){
        console.log("Getting ping error");
        console.log("Error");
        console.log(error);
        res.write("ERROR from catch statement");
    }
});

router.get("/login", (req, res) => {
  console.log("Getting login");
  res.send("ok");
});

router.post("/events", (req, res) => {
    console.log("Posting events");
    res.send("ok");
});




router.get('/findEvent/:id', async function(req, res, next){
    console.log("Getting /findEvent{id}");
    try{
        const { id } = req.params;
        const item = await fric.findOne({
            _id: id,
        });
        if(!item){
            return next();
        }
        return res.json(item);
    } catch(error){
        next(error);
    }
});

router.post("/putEvent", async function(req, res, next){
    console.log("Posting /testPut");
    try{
        console.log(req.body);
        const value = await schema.validateAsync(req.body);
        const inserted = await fric.insert(value);
        res.json(inserted);
    } catch(error){
        next(error);
    }
});

router.put('/updateEvent/:id', async function(req, res, next){
    console.log("Getting /update");
    try{
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await fric.findOne({
            _id : id,
        });
        if(!item){
            return next();
        }
        const updated = await fric.update({
            _id:id,
        }, {
            $set: value,
        });
        return res.json(value);
    } catch (error){
        next(error);
    }
})

router.delete("/deleteEvent/:id", async function(req, res, next){
    console.log("Deleting /delete");
    try{
        const { id } = req.params;
        await fric.remove({ _id: id});
        res.json({
            message:'success',
        })

    } catch (error) {
        next(error);
    }
})


module.exports = router;