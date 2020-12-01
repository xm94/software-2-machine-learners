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
  s_confidentiality: {
    type: DataTypes.STRING,
    allowNull: false
  },
  s_integrity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  s_availability: {
    type: DataTypes.STRING,
    allowNull: false
  },
  e_id: {
    type: DataTypes.UUID,
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

exports.update = async function update(obj){
  

}

exports.getAll = async function getFromId(id){
  var system = await System.findAll();
  return system;
}

exports.getFromId = async function getFromId(id){
  var system = await System.findAll({
    where: {
      s_id: id
    }
  });
  return system[0];
}

exports.getFromEventId = async function getFromEventId(e_id){
  var systems = await System.findAll({
    where: {
      e_id: e_id
    }
  });
  return systems;
}

exports.getFromEventIdArchived = async function getFromEventIdArchived(e_id){
  var systems = await System.findAll({
    where: {
      e_id: e_id,
      s_archived: true,
    }
  });
  return systems;
}

exports.archive = async function archive(s_id){
  const t = await sequelize.transaction();
  try{
    var archivedSystem = await System.update({s_archived: true},{
      where: {
        s_id: s_id
      },
      returning: true,
      plain: true
    });
    await t.commit();
    return archivedSystem[1].dataValues;
  }
  catch(error){
    console.log(error);
    await t.rollback();
    return error;
  }
}


exports.initdb = async function initdb(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
          (async () => {
            await sequelize.sync({force:true});
            
            //const xavier = await System.create({ u_initials: "xm", u_ip: "4354353" , u_is_lead:true});
            //const erik = await System.create({ u_initials: "er", u_ip: "123213" , u_is_lead: false});
            //const users = await System.findAll();
            //console.log(users.every(user => user instanceof System)); // true
            //console.log("All users:", JSON.stringify(users, null, 2));
            //console.log("Synced Systems");
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}