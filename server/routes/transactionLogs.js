var express = require("express");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres

class TransactionLog extends Model {}
TransactionLog.init({
  // Model attributes are defined here
  tl_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  tl_action_initials: {
    type: DataTypes.STRING,
    allowNull: false
  },
  u_id: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'TransactionLog', // We need to choose the model name
  tableName: 'transactions'
});

exports.initdb = async function initdb(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
          (async () => {
            await sequelize.sync();
            
            //const xavier = await Analyst.create({ u_initials: "xm", u_ip: "4354353" , u_is_lead:true});
            //const erik = await Analyst.create({ u_initials: "er", u_ip: "123213" , u_is_lead: false});
            //const users = await Analyst.findAll();
            //console.log(users.every(user => user instanceof Analyst)); // true
            //console.log("All users:", JSON.stringify(users, null, 2));
            console.log("Synced transaction logs");
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}