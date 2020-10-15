var express = require("express");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres

class System extends Model {}
System.init({
  // Model attributes are defined here
  s_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  s_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  s_description: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  s_test_plan: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  s_archived: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'System', // We need to choose the model name
  tableName: 'systems'
});

exports.insert = async function insert(obj){
  var inserted = await System.create(obj);
  console.log("function finished");
  return inserted;
}

exports.initdb = async function initdb(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
          (async () => {
            await sequelize.sync();
            
            //const xavier = await System.create({ u_initials: "xm", u_ip: "4354353" , u_is_lead:true});
            //const erik = await System.create({ u_initials: "er", u_ip: "123213" , u_is_lead: false});
            //const users = await System.findAll();
            //console.log(users.every(user => user instanceof System)); // true
            //console.log("All users:", JSON.stringify(users, null, 2));
            console.log("Synced Systems");
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}