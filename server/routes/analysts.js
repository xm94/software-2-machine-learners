var express = require("express");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres

class Analyst extends Model {}
Analyst.init({
  // Model attributes are defined here
  u_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  u_initials: {
    type: DataTypes.STRING,
    allowNull: false
  },
  u_fname: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  u_lname: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  u_role: {
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

exports.insert = async function insert(obj){
    var inserted = await Analyst.create(obj);
    console.log("function finished");
}

exports.initdb = async function initdb(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
          (async () => {
            await sequelize.sync();
            // const xavier = await Analyst.create({ u_id:"2d438a24-cde2-4488-bcec-f1d2e24c4403", u_initials: "XM", u_fname: "Xavier" , u_lname:"Martinez",u_role:"Lead Analyst"});
            // const erik = await Analyst.create({ u_id:"494e965b-85b5-4174-bf7c-adbc74afde45", u_initials: "EM", u_fname: "Erik" , u_lname:"Martinez",u_role:"Analyst"});
            // const zabdi = await Analyst.create({ u_id:"88f44655-39d3-4e54-a798-a8cc73d53a4e", u_initials: "ZV", u_fname: "Zabdi" , u_lname:"Valenciana",u_role:"Analyst"});
            // const luis = await Analyst.create({ u_id:"8a494000-874f-442e-90f6-60f21b9ab66d", u_initials: "LG", u_fname: "Luis" , u_lname:"Garcia",u_role:"Analyst"});
            // const ricardo = await Analyst.create({ u_id:"73875702-230a-4981-a898-d6d1f60b9814", u_initials: "RG", u_fname: "Ricardo" , u_lname:"Godoy",u_role:"Analyst"});
            //const users = await Analyst.findAll();
            //console.log(users.every(user => user instanceof Analyst)); // true
            //console.log("All users:", JSON.stringify(users, null, 2));
            console.log("Synced analysts");
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
