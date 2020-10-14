var express = require("express");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres

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
  e_verson: {
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
            await sequelize.sync();
            
            //const xavier = await Event.create({ u_initials: "xm", u_ip: "4354353" , u_is_lead:true});
            //const erik = await Event.create({ u_initials: "er", u_ip: "123213" , u_is_lead: false});
            //const users = await Event.findAll();
            //console.log(users.every(user => user instanceof Event)); // true
            //console.log("All users:", JSON.stringify(users, null, 2));
            console.log("Synced Events");
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}