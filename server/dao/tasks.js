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

exports.getAll = async function getAll(){
  var tasks = await Task.findAll();
  return tasks;
}

async function getAttachments(t_id){
  var attachments = await TaskAttachment.findAll({
    where: {
      t_id: t_id
    }
  });
  return attachments;
}

async function getCollaborators(t_id){
  var collaborators = await TaskCollaborator.findAll({
    where: {
      t_id: t_id
    }
  });
  return collaborators;
}

async function getAssociations(t_id){
  var associations = await TaskAssociation.findAll({
    where: {
      t_id: t_id
    }
  });
  return associations;
}

exports.getFromId = async function getFromId(t_id){
  var task = await Task.findAll({
    where: {
      t_id: t_id
    }
  });
  var res = task[0].toJSON();
  res["t_attachments"] = await getAttachments(t_id);
  res["t_collaborators"] = await getCollaborators(t_id);
  res["t_associations"] = await getAssociations(t_id);
  return res;
}

exports.insert = async function insert(object){
  const t = await sequelize.transaction();
  var attachments = object.t_attachments;
  var collaborators = object.t_collaborators;
  var associations = object.t_associations;
  try{
    var inserted = await Task.create({
      t_id: object.t_id,
      t_name: object.t_name,
      t_description: object.t_description,
      t_priority: object.t_priority,
      t_progress: object.t_progress,
      t_due_date: object.t_due_date,
      s_id: object.s_id,
      a_id: object.a_id,
      t_archived: object.t_archived
    });
    for(a of attachments){
      var insertedAttachment = await TaskAttachment.create({
        t_id: inserted.t_id,
        t_attachment: a
      });
    }
    for(c of collaborators){
      var insertedCollaborator = await TaskCollaborator.create({
        t_id: inserted.t_id,
        a_id: c
      });
    }
    for(a of associations){
      var st1_to_st2 = await TaskAssociation.create({
        t_id: inserted.t_id,
        assoc_t_id: a
      });
      var st2_to_st1 = await TaskAssociation.create({
        t_id: a,
        assoc_t_id: inserted.t_id
      });
    }
    var res = inserted.toJSON();
    res["t_attachments"] = await getAttachments(res.t_id);
    res["t_collaborators"] = await getCollaborators(res.t_id);
    res["t_associations"] = await getAssociations(res.t_id);
    await t.commit();
    return res;
  }
  catch(error){
    await t.rollback();
    console.log(error);
    return error;
  }
}
exports.update = async function update(object){
  const t = await sequelize.transaction();
  var delAttach = object.del_attachments ? object.del_attachments : [];
  var newAttach = object.new_attachments ? object.new_attachments : [];
  var delCollab = object.del_collaborators ? object.del_collaborators : [];
  var newCollab = object.new_collaborators ? object.new_collaborators : [];
  var delAssoc = object.del_associations ? object.del_associations : [];
  var newAssoc = object.new_associations ? object.new_associations : [];
  try{
    var updatedtask = await Task.update({
      t_id: object.t_id,
      t_name: object.t_name,
      t_description: object.t_description,
      t_priority: object.t_priority,
      t_progress: object.t_progress,
      t_due_date: object.t_due_date,
      s_id: object.s_id,
      a_id: object.a_id
    },{
      where: {
        t_id: object.t_id
      }
    });
    for(a of newAttach){
      var newAttachment = await TaskAttachment.create({
        t_id: object.t_id,
        t_attachment: a
      });
    }
    for(a of delAttach){
      var delAttachments = await TaskAttachment.destroy({
        where: {
          ta_id: a.ta_id
        }
      });
    }
    for(c of newCollab){
      var newCollaborator = await TaskCollaborator.create({
        t_id: object.t_id,
        a_id: c
      });
    }
    for(c of delCollab){
      var delColllabs = await TaskCollaborator.destroy({
        where: {
          a_id: c
        }
      })
    }
    for(a of newAssoc){
      var new_st1_to_st2 = await TaskAssociation.create({
        t_id: object.t_id,
        assoc_t_id: a
      });
      var new_st2_to_st1 = await SubTaskAssociation.create({
        t_id: a,
        assoc_t_id: object.t_id
      });
    }
    for(a of delAssoc){
      var del_st1_st1 = await SubTaskAssociation.destroy({
        where:{
          t_id: object.t_id,
          assoc_st_id: a
        }
      });
      var del_st2_st1 = await SubTaskAssociation.destroy({
        where: {
          st_id: a,
          assoc_t_id: object.t_id
        }
      });
    }
    var task = await Task.findAll({
      where: {
        t_id: object.t_id
      }
    });
    var res = subtask[0].toJSON();
    res["t_attachments"] = await getAttachments(res.t_id);
    res["t_collaborators"] = await getCollaborators(res.t_id);
    res["t_associations"] = await getAssociations(res.t_id);
    await t.commit();
    return res;
  }
  catch(error){
    await t.rollback();
    console.log(error);
    return error;
  }
}
exports.archive = async function archive(t_id){
  const t = await sequelize.transaction();
  try{
    var archivedTask = await Task.update({t_archived: true},{
      where: {
        t_id: t_id
      },
      returning: true,
      plain: true
    });
    await t.commit();
    return archivedTask[1].dataValues;
  }
  catch(error){
    await t.rollback();
    console.log(error);
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