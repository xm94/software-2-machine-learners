var express = require("express");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres
var transactionLogs = require("./transactionLogs");

class Event extends Model {}
Event.init({
  // Model attributes are defined here
  e_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  e_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  e_description: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  e_type: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  e_version: {
    type: DataTypes.INTEGER,
    allowNull: false
    // allowNull defaults to true
  },
  e_assessment_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
    // allowNull defaults to true
  },
  e_sec_class_title_guide: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  e_org_name: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  e_classification: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  e_declassification_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
    // allowNull defaults to true
  },
  e_customer: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  e_archived: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Event', // We need to choose the model name
  tableName: 'events'
});

class EventTeam extends Model {}
EventTeam.init({
  // Model attributes are defined here
  e_id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  a_id: {
    type: DataTypes.UUID,
    primaryKey: true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'EventTeam', // We need to choose the model name
  tableName: 'event_team'
});




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
            console.log("Synced EventTeams");
            transactionLogs.insert({a_initials:"XM",tl_action_performed: "Initialized Table", a_id:"2d438a24-cde2-4488-bcec-f1d2e24c4403"})
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}