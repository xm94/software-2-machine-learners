var express = require("express");
const { Sequelize, DataTypes, Model, col } = require('sequelize');
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
    e_id: {
      type: DataTypes.UUID,
      allowNull: false
      // allowNull defaults to true
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

exports.getAll = async function getAll(){
  var subtasks = await SubTask.findAll();
  return subtasks;
}

async function getAttachments(st_id){
  var attachments = await SubTaskAttachment.findAll({
    where: {
      st_id: st_id
    }
  });
  return attachments;
}

async function getCollaborators(st_id){
  var collaborators = await SubTaskCollaborator.findAll({
    where: {
      st_id: st_id
    }
  });
  return collaborators;
}

async function getAssociations(st_id){
  var associations = await SubTaskAssociation.findAll({
    where: {
      st_id: st_id
    }
  });
  return associations;
}

exports.getFromId = async function getFromId(st_id){
  var subtask = await SubTask.findAll({
    where: {
      st_id: st_id
    }
  });
  var res = subtask[0].toJSON();
  res["st_attachments"] = await getAttachments(st_id);
  res["st_collaborators"] = await getCollaborators(st_id);
  res["st_associations"] = await getAssociations(st_id);
  return res;
}

exports.getFromSystemId = async function getFromSystemId(s_id){
  var subtasks = await SubTask.findAll({
    where: {
      s_id: s_id
    }
  });
  let resList = [];
  for(st of subtasks){
    var res = st.toJSON();
    res["st_attachments"] = await getAttachments(st.st_id);
    res["st_collaborators"] = await getCollaborators(st.st_id);
    res["st_associations"] = await getAssociations(st.st_id);
    resList.push(res);
  }
  return resList;
}

exports.getFromTaskId = async function getFromTaskId(t_id){
  var subtasks = await SubTask.findAll({
    where: {
      t_id: t_id
    }
  });
  let resList = [];
  for(st of subtasks){
    var res = st.toJSON();
    res["st_attachments"] = await getAttachments(st.st_id);
    res["st_collaborators"] = await getCollaborators(st.st_id);
    res["st_associations"] = await getAssociations(st.st_id);
    resList.push(res);
  }
  return resList;
}

exports.getFromEventId = async function getFromEventId(e_id){
  var subtasks = await SubTask.findAll({
    where: {
      e_id: e_id,
      st_archived: false,
    }
  });
  let resList = [];
  for(st of subtasks){
    var res = st.toJSON();
    res["st_attachments"] = await getAttachments(st.st_id);
    res["st_collaborators"] = await getCollaborators(st.st_id);
    res["st_associations"] = await getAssociations(st.st_id);
    resList.push(res);
  }
  return resList;
}

exports.getFromAnalystId = async function getFromAnalystId(a_id){
  var subtasks = await SubTask.findAll({
    where: {
      a_id: a_id
    }
  });
  let resList = [];
  for(st of subtasks){
    var res = st.toJSON();
    res["st_attachments"] = await getAttachments(st.st_id);
    res["st_collaborators"] = await getCollaborators(st.st_id);
    res["st_associations"] = await getAssociations(st.st_id);
    resList.push(res);
  }
  return resList;
}

exports.getFromCollaboratorId = async function getFromCollaboratorId(a_id){
  var subtaskList = await SubTaskCollaborator.findAll({
    where: {
      a_id: a_id
    }
  });
  var sIdList = [];
  for(subtask of subtaskList){
    sIdList.push(subtask.st_id);
  }
  var subtasks = await SubTask.findAll({
    where: {
      st_id: sIdList
    }
  });
  let resList = [];
  for(st of subtasks){
    var res = st.toJSON();
    res["st_attachments"] = await getAttachments(st.st_id);
    res["st_collaborators"] = await getCollaborators(st.st_id);
    res["st_associations"] = await getAssociations(st.st_id);
    resList.push(res);
  }
  return resList;
}

exports.getFromEventIdArchived = async function getFromEventIdArchived(e_id){
  var subtasks = await SubTask.findAll({
    where: {
      e_id: e_id,
      st_archived: true,
    }
  });
  let resList = [];
  for(st of subtasks){
    var res = st.toJSON();
    res["st_attachments"] = await getAttachments(st.st_id);
    res["st_collaborators"] = await getCollaborators(st.st_id);
    res["st_associations"] = await getAssociations(st.st_id);
    resList.push(res);
  }
  return resList;
}

exports.insert = async function insert(object){
  const t = await sequelize.transaction();
  var attachments = object.st_attachments;
  var collaborators = object.st_collaborators;
  var associations = object.st_associations;
  try{
    var inserted = await SubTask.create({
      st_id: object.st_id,
      st_name: object.st_name,
      st_description: object.st_description,
      st_priority: object.st_priority,
      st_progress: object.st_progress,
      st_due_date: object.st_due_date,
      e_id: object.e_id,
      s_id: object.s_id,
      t_id: object.t_id,
      a_id: object.a_id,
      st_archived: object.st_archived
    });
    for(a of attachments){
      fs.readFile(a.path, async function (err,filedata){
        var insertedAttachment = await SubTaskAttachment.create({
          st_id: inserted.st_id,
          st_attachment: filedata
        });
      });
    }
    for(c of collaborators){
      var insertedCollaborator = await SubTaskCollaborator.create({
        st_id: inserted.st_id,
        a_id: c
      });
    }
    for(a of associations){
      var st1_to_st2 = await SubTaskAssociation.create({
        st_id: inserted.st_id,
        assoc_st_id: a
      });
      var st2_to_st1 = await SubTaskAssociation.create({
        st_id: a,
        assoc_st_id: inserted.st_id
      });
    }
    var res = inserted.toJSON();
    res["st_attachments"] = await getAttachments(res.st_id);
    res["st_collaborators"] = await getCollaborators(res.st_id);
    res["st_associations"] = await getAssociations(res.st_id);
    await t.commit();
    return res;
  }
  catch(error){
    await t.rollback();
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
    var updatedSubtask = await SubTask.update({
      st_name: object.st_name,
      st_description: object.st_description,
      st_priority: object.st_priority,
      st_progress: object.st_progress,
      st_due_date: object.st_due_date,
      s_id: object.s_id,
      t_id: object.t_id,
      a_id: object.a_id,
      st_archived: object.st_archived
    },{
      where: {
        st_id: object.st_id
      }
    });
    for(a of newAttach){
      var newAttachment = await SubTaskAttachment.create({
        st_id: object.st_id,
        st_attachment: a
      });
    }
    for(a of delAttach){
      var delAttachments = await SubTaskAttachment.destroy({
        where: {
          sta_id: a.sta_id
        }
      });
    }
    for(c of newCollab){
      var newCollaborator = await SubTaskCollaborator.create({
        st_id: object.st_id,
        a_id: c
      });
    }
    for(c of delCollab){
      var delColllabs = await SubTaskCollaborator.destroy({
        where: {
          a_id: c
        }
      })
    }
    for(a of newAssoc){
      var new_st1_to_st2 = await SubTaskAssociation.create({
        st_id: object.st_id,
        assoc_st_id: a
      });
      var new_st2_to_st1 = await SubTaskAssociation.create({
        st_id: a,
        assoc_st_id: object.st_id
      });
    }
    for(a of delAssoc){
      var del_st1_st1 = await SubTaskAssociation.destroy({
        where:{
          st_id: object.st_id,
          assoc_st_id: a
        }
      });
      var del_st2_st1 = await SubTaskAssociation.destroy({
        where: {
          st_id: a,
          assoc_st_id: object.st_id
        }
      });
    }
    var subtask = await SubTask.findAll({
      where: {
        st_id: object.st_id
      }
    });
    var res = subtask[0].toJSON();
    res["st_attachments"] = await getAttachments(res.st_id);
    res["st_collaborators"] = await getCollaborators(res.st_id);
    res["st_associations"] = await getAssociations(res.st_id);
    await t.commit();
    return res;
  }
  catch(error){
    await t.rollback();
    console.log(error);
    return error;
  }
}
exports.archive = async function archive(st_id){
  const t = await sequelize.transaction();
  try{
    var archivedSubtask = await SubTask.update({st_archived: true},{
      where: {
        st_id: st_id
      },
      returning: true,
      plain: true
    });
    await t.commit();
    return archivedSubtask[1].dataValues;
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
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}