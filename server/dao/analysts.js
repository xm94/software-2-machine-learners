var express = require("express");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres
var transactionLogs = require("./transactionLogs");

class Analyst extends Model {}
Analyst.init({
  // Model attributes are defined here
  a_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  a_initials: {
    type: DataTypes.STRING,
    allowNull: false
  },
  a_fname: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  a_lname: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  a_role: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Analyst', // We need to choose the model name
  tableName: 'analysts'
});

class AnalystTitle extends Model {}
AnalystTitle.init({
  // Model attributes are defined here
  a_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  a_title: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'AnalystTitle', // We need to choose the model name
  tableName: 'analysts_titles'
});

exports.insert = async function insert(obj){
    var inserted = await Analyst.create(obj);
    console.log("function finished");
}

exports.getAll = async function getAll(){
  const users = await Analyst.findAll();
  return users;
}

exports.getFromInitials = async function getFromInitials(initials){
  var analyst = await Analyst.findAll({
    where: {
      a_initials: initials
    }
  });
  return analyst[0];
}

exports.initdb = async function initdb(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
          (async () => {
            await sequelize.sync({force: true});
            const xavier = await Analyst.create({ a_id:"2d438a24-cde2-4488-bcec-f1d2e24c4403", a_initials: "XM", a_fname: "Xavier" , a_lname:"Martinez",a_role:"Lead Analyst"});
            const erik = await Analyst.create({ a_id:"494e965b-85b5-4174-bf7c-adbc74afde45", a_initials: "EM", a_fname: "Erik" , a_lname:"Martinez",a_role:"Analyst"});
            const zabdi = await Analyst.create({ a_id:"88f44655-39d3-4e54-a798-a8cc73d53a4e", a_initials: "ZV", a_fname: "Zabdi" , a_lname:"Valenciana",a_role:"Analyst"});
            const luis = await Analyst.create({ a_id:"8a494000-874f-442e-90f6-60f21b9ab66d", a_initials: "LG", a_fname: "Luis" , a_lname:"Garcia",a_role:"Analyst"});
            const ricardo = await Analyst.create({ a_id:"73875702-230a-4981-a898-d6d1f60b9814", a_initials: "RG", a_fname: "Ricardo" , a_lname:"Godoy",a_role:"Analyst"});
            // const users = await Analyst.findAll();
            // console.log(users.every(user => user instanceof Analyst)); // true
            // console.log("All users:", JSON.stringify(users, null, 2));
            console.log("Synced analysts");
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
