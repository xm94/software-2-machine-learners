var express = require("express");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres

class SubTask extends Model {}

SubTask.init({
    // Model attributes are defined here
    st_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
        primaryKey: true
    },
    st_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    st_description: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    st_priority: {
        type: DataTypes.STRING,
        allowNull: false
    },
    st_progress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    st_due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    s_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    t_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    a_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    st_archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'SubTask', // We need to choose the model name
    tableName: 'subtasks'
  });


class SubTaskAttachment extends Model {}
SubTaskAttachment.init({
  // Model attributes are defined here
  sta_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  st_id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  st_attachment: {
    type: DataTypes.BLOB,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'SubTaskAttachment', // We need to choose the model name
  tableName: 'subtask_attachment'
});


class SubTaskCollaborator extends Model {}
SubTaskCollaborator.init({
  // Model attributes are defined here
  st_id: {
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
  modelName: 'SubTaskCollaborator', // We need to choose the model name
  tableName: 'subtask_collaborator'
});


class SubTaskAssociation extends Model {}
SubTaskAssociation.init({
  // Model attributes are defined here
  st_id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  assoc_st_id: {
    type: DataTypes.UUID,
    primaryKey: true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'SubTaskAssociation', // We need to choose the model name
  tableName: 'subtask_association'
});


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
            //console.log("Synced Systems");
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}