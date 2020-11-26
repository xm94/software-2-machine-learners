var express = require("express");
const { Sequelize, DataTypes, Model, Op} = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres
var transactionLogs = require("./transactionLogs");

class Configuration extends Model {}
Configuration.init({
  // Model attributes are defined here
  c_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  c_f_types: {
    type: DataTypes.STRING,
    allowNull: false
  },
  c_f_classifications: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  c_posture_types: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  c_e_types: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  c_e_classifications: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  c_notifications_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
  },
  c_n_duration: {
    type: DataTypes.BIGINT,
    // allowNull defaults to true
  },
  c_n_frequency: {
    type: DataTypes.INTEGER,
    // allowNull defaults to true
  },
  e_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Configuration', // We need to choose the model name
  tableName: 'config'
});

exports.insert = async function insert(obj){
    var inserted = await Configuration.create(obj);
    console.log("function finished");
    return inserted;
}

exports.getAll = async function getAll(){
  const users = await Configuration.findAll();
  return users;
}

exports.getFromId = async function getFromId(id){
  var config = await Configuration.findAll({
    where: {
      e_id: id
    }
  });
  return config[0];
}


exports.updateNotifications = async function updateNotifications(id,object){
  var updatedConfig = await Configuration.update({
    c_notifications_enabled:object.c_notifications_enabled,
    c_n_duration: object.c_n_duration,
    c_n_frequency: object.c_n_frequency
  }, {
    where: {
      e_id: id
    }
  });
  console.log("updateEvent objected");
  console.log(updatedConfig);
  return updatedConfig[0];
}

exports.initdb = async function initdb(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
          (async () => {
            await sequelize.sync({force: true});
            // const xavier = await Configuration.create({ a_id:"2d438a24-cde2-4488-bcec-f1d2e24c4403", a_initials: "XM", a_fname: "Xavier" , a_lname:"Martinez",a_role:"Lead Configuration", a_ip: ""});
            // const erik = await Configuration.create({ a_id:"494e965b-85b5-4174-bf7c-adbc74afde45", a_initials: "EM", a_fname: "Erik" , a_lname:"Martinez",a_role:"Configuration", a_ip: ""});
            // const zabdi = await Configuration.create({ a_id:"88f44655-39d3-4e54-a798-a8cc73d53a4e", a_initials: "ZV", a_fname: "Zabdi" , a_lname:"Valenciana",a_role:"Configuration", a_ip: ""});
            // const luis = await Configuration.create({ a_id:"8a494000-874f-442e-90f6-60f21b9ab66d", a_initials: "LG", a_fname: "Luis" , a_lname:"Garcia",a_role:"Configuration", a_ip: ""});
            // const ricardo = await Configuration.create({ a_id:"73875702-230a-4981-a898-d6d1f60b9814", a_initials: "RG", a_fname: "Ricardo" , a_lname:"Godoy",a_role:"Configuration", a_ip: ""});
            // const title1 = await ConfigurationTitle.create({ a_id:"88f44655-39d3-4e54-a798-a8cc73d53a4e", a_title: "Software Developer"});
            // const title2 = await ConfigurationTitle.create({ a_id:"88f44655-39d3-4e54-a798-a8cc73d53a4e", a_title: "Verification & Validation"});
            // // const users = await Configuration.findAll();
            // console.log(users.every(user => user instanceof Configuration)); // true
            // console.log("All users:", JSON.stringify(users, null, 2));
            //console.log("Synced Configurations");
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
