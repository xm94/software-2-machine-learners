var express = require("express");
const { Sequelize, DataTypes, Model, Op} = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres

class Notification extends Model {}
Notification.init({
  // Model attributes are defined here
  n_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  n_text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  n_fire_time: {
    type: DataTypes.DATEONLY,
    allowNull: false
    // allowNull defaults to true
  },
  n_recipient: {
    type: DataTypes.UUID,
    allowNull: false
    // allowNull defaults to true
  },
  n_task: {
    type: DataTypes.UUID,
    allowNull: false
    // allowNull defaults to true
  },
  n_read: {
    type: DataTypes.BOOLEAN,
    allowNull: false
    // allowNull defaults to true
  },
  n_archived: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
  
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Notification', // We need to choose the model name
  tableName: 'notifications'
});


exports.getAll = async function getAll(){
    const nots = await Notification.findAll();
    return nots;
  }

exports.getAllForAnalyst = async function getAllForAnalyst(a_id){
    const nots = await Notification.findAll({
        where: {
            n_recipient: a_id,
            n_fire_time: {
                lte: new Date(Date.now())
            }
        }
    });
    return nots;
}

exports.insert = async function insert(object){
  var inserted = await Notification.create(object);
  return inserted;
}

exports.initdb = async function initdb(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
          (async () => {
            await sequelize.sync({force:true});
            
            // const event = await Event.create({ 
            //   e_id: "4896b5e9-8c76-4652-8e58-68b32f43c4ea",
            //   e_name: "Test Event",
            //   e_description: "A test event",
            //   e_type: "Cooperative Vulnerability Penetration Assessment (CVPA)",
            //   e_version: 1,
            //   e_assessment_date: new Date(),
            //   e_org_name: "Test Org",
            //   e_sec_class_title_guide: "Test Guide",
            //   e_classification: "Top Secret",
            //   e_declassification_date: new Date(),
            //   e_customer: "CEAD",
            //   e_archived: false});
           // var notification = await Notification.create({n_text:"Task 1 due - assigned to XM -in n days",n_due_date:Date.now(),n_duration:"5D",n_frequency:"1D",
       // n_last_fired:Date.now(),n_archived:false});
        //var notification = await Notification.create({n_text:"Task 1 due - assigned to XM -in n hours",n_due_date:Date.now(),n_duration:"8H",n_frequency:"2H",
        //n_last_fired:Date.now(),n_archived:false});
            // console.log("Created Event " + event.e_name + " with id " + event.e_id);
            // const xavier = await EventTeam.create({ e_id:event.e_id, a_id:"2d438a24-cde2-4488-bcec-f1d2e24c4403"});
            // const erik = await EventTeam.create({ e_id:event.e_id, a_id:"494e965b-85b5-4174-bf7c-adbc74afde45"});
            // const zabdi = await EventTeam.create({ e_id:event.e_id, a_id:"88f44655-39d3-4e54-a798-a8cc73d53a4e"});
            // const luis = await EventTeam.create({ e_id:event.e_id, a_id:"8a494000-874f-442e-90f6-60f21b9ab66d"});
            // const ricardo = await EventTeam.create({ e_id:event.e_id, a_id:"73875702-230a-4981-a898-d6d1f60b9814"});
            // const events = await Event.findAll();
            // console.log(events.every(user => user instanceof Event)); // true
            // console.log("All events:", JSON.stringify(events, null, 2));
            // console.log("Synced Events");
            // const users = await EventTeam.findAll();
            // console.log(users.every(user => user instanceof EventTeam)); // true
            // console.log("All users:", JSON.stringify(users, null, 2));
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}