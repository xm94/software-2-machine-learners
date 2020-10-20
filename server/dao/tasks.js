var express = require("express");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres

class Task extends Model {}

Task.init({
    // Model attributes are defined here
    t_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
        primaryKey: true
    },
    t_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    t_description: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    t_priority: {
        type: DataTypes.STRING,
        allowNull: false
    },
    t_progress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    t_due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    s_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    a_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    t_archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Task', // We need to choose the model name
    tableName: 'tasks'
  });


class TaskAttachment extends Model {}
TaskAttachment.init({
  // Model attributes are defined here
  ta_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  t_id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  t_attachment: {
    type: DataTypes.BLOB,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'TaskAttachment', // We need to choose the model name
  tableName: 'task_attachment'
});

class TaskCollaborator extends Model {}
TaskCollaborator.init({
  // Model attributes are defined here
  t_id: {
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
  modelName: 'TaskCollaborator', // We need to choose the model name
  tableName: 'task_collaborator'
});

class TaskAssociation extends Model {}
TaskAssociation.init({
  // Model attributes are defined here
  t_id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  assoc_t_id: {
    type: DataTypes.UUID,
    primaryKey: true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'TaskAssociation', // We need to choose the model name
  tableName: 'task_association'
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