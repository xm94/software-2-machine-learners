var express = require("express");
var systems = require("../dao/systems")
var tasks = require("../dao/tasks")
var subtasks = require("../dao/subtasks")
var analysts = require("../dao/analysts")
var fUtils = require("../utils/findingUtils")

const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres
const fs = require('fs');

class Finding extends Model {}
Finding.init({
  // Model attributes are defined here
  f_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  f_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_host_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_ip_port: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_long_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  f_status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_classification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_confidentiality: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  f_integrity: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  f_availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  f_posture: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_relevance: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_countermeasure_effectiveness_rating: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_countermeasure_effectiveness_score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  f_impact_desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_impact_level: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_cat_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_cat_score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  f_vuln_severity: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  f_quant_vuln_severity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_risk: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_likelihood: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_confidentiality_impact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_integrity_impact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_availability_impact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_impact_score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  a_id: {
    type: DataTypes.UUID,
    allowNull: false
    // allowNull defaults to true
  },
  a_initials: {
    type: DataTypes.STRING,
    allowNull: false
  },
  e_id: {
    type: DataTypes.UUID,
    allowNull: false
    // allowNull defaults to true
  },
  s_id: {
    type: DataTypes.UUID,
    allowNull: false
    // allowNull defaults to true
  },
  t_id: {
    type: DataTypes.UUID,
    allowNull: true
    // allowNull defaults to true
  },
  st_id: {
    type: DataTypes.UUID,
    allowNull: true
    // allowNull defaults to true
  },
  f_level: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_archived: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Finding', // We need to choose the model name
  tableName: 'findings'
});

class FindingMitigation extends Model {}
FindingMitigation.init({
  // Model attributes are defined here
  m_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  m_brief_description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  m_long_description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  f_id: {
    type: DataTypes.UUID,
    primaryKey: true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'FindingMitigation', // We need to choose the model name
  tableName: 'finding_mitigation'
});

class FindingEvidence extends Model {}
FindingEvidence.init({
  // Model attributes are defined here
  fe_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  f_id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  f_evidence: {
    type: DataTypes.BLOB("long"),
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'FindingEvidence', // We need to choose the model name
  tableName: 'finding_evidence'
});

class FindingCollaborator extends Model {}
FindingCollaborator.init({
  // Model attributes are defined here
  fc_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },
  f_id: {
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
  modelName: 'FindingCollaborator', // We need to choose the model name
  tableName: 'finding_collaborator'
});

class FindingAssociation extends Model {}
FindingAssociation.init({
  // Model attributes are defined here
  fa_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true
  },  
  f_id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  assoc_f_id: {
    type: DataTypes.UUID,
    primaryKey: true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'FindingAssociation', // We need to choose the model name
  tableName: 'finding_association'
});

exports.getFromId = async function getFromId(f_id){
  var finding = await Finding.findAll({
    where: {
      f_id: f_id
    }
  });
  res = finding[0].toJSON();
  res["f_mitigations"]= await getMitigations(f_id);
  res["f_evidence"] = await getEvidence(f_id);
  res["f_collaborators"] = await getCollaborators(f_id);
  res["f_associations"] = await getAssociations(f_id);
  return res;
}

exports.getFromEventId = async function getFromEventId(e_id){
  console.log("select");
  var findings = await Finding.findAll({
    where: {
      e_id: e_id
    }
  });
  resList=[]
  for(f of findings){
    res = f.toJSON();
    res["f_mitigations"]= await getMitigations(f.f_id);
    res["f_evidence"] = await getEvidence(f.f_id);
    res["f_collaborators"] = await getCollaborators(f.f_id);
    res["f_associations"] = await getAssociations(f.f_id);
    resList.push(res);
  }
  return resList;
}

exports.getFromEventIdArchived = async function getFromEventIdArchived(e_id){
  console.log("select");
  var findings = await Finding.findAll({
    where: {
      e_id: e_id,
      f_archived: true,
    }
  });
  resList=[]
  for(f of findings){
    res = f.toJSON();
    res["f_mitigations"]= await getMitigations(f.f_id);
    res["f_evidence"] = await getEvidence(f.f_id);
    res["f_collaborators"] = await getCollaborators(f.f_id);
    res["f_associations"] = await getAssociations(f.f_id);
    resList.push(res);
  }
  return resList;
}

exports.getFromSystemId = async function getFromSystemId(s_id){
  console.log("select");
  var findings = await Finding.findAll({
    where: {
      s_id: s_id
    }
  });
  resList=[]
  for(f of findings){
    res = f.toJSON();
    res["f_mitigations"]= await getMitigations(f.f_id);
    res["f_evidence"] = await getEvidence(f.f_id);
    res["f_collaborators"] = await getCollaborators(f.f_id);
    res["f_associations"] = await getAssociations(f.f_id);
    resList.push(res);
  }
  return resList;
}

exports.getFromAnalystId = async function getFromAnalystId(a_id){
  console.log("select");
  var findings = await Finding.findAll({
    where: {
      a_id: a_id
    }
  });
  resList=[]
  for(f of findings){
    res = f.toJSON();
    res["f_mitigations"]= await getMitigations(f.f_id);
    res["f_evidence"] = await getEvidence(f.f_id);
    res["f_collaborators"] = await getCollaborators(f.f_id);
    res["f_associations"] = await getAssociations(f.f_id);
    resList.push(res);
  }
  return resList;
}

exports.getFromCollaboratorId = async function getFromCollaboratorId(a_id){
  console.log("select");
  var fList = await FindingCollaborator.findAll({
    where: {
      a_id: a_id
    }
  });
  fIdList = []
  for(f of fList){
    fIdList.push(f.f_id)
  }
  var findings = await Finding.findAll({
    where: {
     f_id: fIdList
    }
  });
  resList=[]
  for(f of findings){
    res = f.toJSON();
    res["f_mitigations"]= await getMitigations(f.f_id);
    res["f_evidence"] = await getEvidence(f.f_id);
    res["f_collaborators"] = await getCollaborators(f.f_id);
    res["f_associations"] = await getAssociations(f.f_id);
    resList.push(res);
  }
  return resList;
}

exports.getFromTaskId = async function getFromTaskId(t_id){
  console.log("select");
  var findings = await Finding.findAll({
    where: {
      t_id: t_id
    }
  });
  resList=[]
  for(f of findings){
    res = f.toJSON();
    res["f_mitigations"]= await getMitigations(f.f_id);
    res["f_evidence"] = await getEvidence(f.f_id);
    res["f_collaborators"] = await getCollaborators(f.f_id);
    res["f_associations"] = await getAssociations(f.f_id);
    resList.push(res);
  }
  return resList;
}

exports.getFromSubtaskId = async function getFromSubtaskId(st_id){
  console.log("select");
  var findings = await Finding.findAll({
    where: {
      st_id: st_id
    }
  });
  resList=[]
  for(f of findings){
    res = f.toJSON();
    res["f_mitigations"]= await getMitigations(f.f_id);
    res["f_evidence"] = await getEvidence(f.f_id);
    res["f_collaborators"] = await getCollaborators(f.f_id);
    res["f_associations"] = await getAssociations(f.f_id);
    resList.push(res);
  }
  return resList;
}

async function getMitigations(f_id){
  var findingMitigations = await FindingMitigation.findAll({
    where: {
      f_id: f_id
    }
  });
  return findingMitigations;
}

async function getEvidence(f_id){
  var findingEvidence = await FindingEvidence.findAll({
    where: {
      f_id: f_id
    }
  });
  return findingEvidence;
}

async function getAssociations(f_id){
  var findingAssociations = await FindingAssociation.findAll({
    where: {
      f_id: f_id
    }
  });
  return findingAssociations;
}

async function getCollaborators(f_id){
  var findingCollaborators = await FindingCollaborator.findAll({
    where: {
      f_id: f_id
    }
  });
  return findingCollaborators;
}

exports.getAll = async function getAll(){
  var findings = await Finding.findAll();
  return findings;
}

exports.insert = async function insert(object,a_id){
    const t = await sequelize.transaction();
    //calculating derived fields
    var mitigations = object.f_mitigations;
    console.log(mitigations);
    console.log(object);
    var evidence = object.f_evidence;
    var collaborators = object.f_collaborators;
    var associations = object.f_associations;
    var system = await systems.getFromId(object.s_id);
    var analyst = await analysts.getFromId(a_id);
    var c_impact = object.f_confidentiality? (system.s_confidentiality=="Informational"? "X" : system.s_confidentiality) : "X";
    var i_impact = object.f_integrity? (system.s_integrity=="Informational"? "X" : system.s_integrity) : "X";
    var a_impact = object.f_availability? (system.s_availability=="Informational"? "X" : system.s_availability) : "X";
    var cat_score = fUtils.computeCATScore(object.f_cat_code);
    var impact_score = fUtils.computeImpactScore(c_impact,i_impact,a_impact);
    var vuln_severity = (cat_score * object.f_countermeasure_effectiveness_score * impact_score)/10;
    var quant_vuln_severity = fUtils.computeQuantativeVulnerabilitySeverity(vuln_severity);
    var likelihood = fUtils.computeLikelihood(object.f_relevance,quant_vuln_severity);
    var risk = fUtils.computeRisk(likelihood,object.f_impact_level);
    //creating the object with both sent and derived data
    try{
        var inserted = await Finding.create({
            f_id:object.f_id,
            f_name:object.f_name,
            f_host_name:object.f_host_name,
            f_ip_port:object.f_ip_port,
            f_description:object.f_description,
            f_long_description:object.f_long_description,
            f_status:object.f_status,
            f_type:object.f_type,
            f_classification:object.f_classification,
            f_confidentiality:object.f_confidentiality,
            f_integrity:object.f_integrity,
            f_availability:object.f_availability,
            f_posture:object.f_posture,
            f_relevance:object.f_relevance,
            f_countermeasure_effectiveness_rating:object.f_countermeasure_effectiveness_rating,
            f_countermeasure_effectiveness_score:object.f_countermeasure_effectiveness_score,
            f_impact_desc:object.f_impact_desc,
            f_impact_level:object.f_impact_level,
            f_cat_code:object.f_cat_code,
            f_cat_score:cat_score,//derived
            f_vuln_severity:vuln_severity,//derived
            f_quant_vuln_severity:quant_vuln_severity,//derived
            f_risk:risk,//derived
            f_likelihood:likelihood,//derived
            f_confidentiality_impact:c_impact,
            f_integrity_impact:i_impact,
            f_availability_impact:a_impact,
            f_impact_score:impact_score,//derived
            a_id:a_id,
            a_initials:analyst.a_initials,
            e_id: object.e_id,
            s_id:object.s_id,
            t_id:object.t_id ? object.t_id : null,
            st_id:object.st_id ? object.st_id : null,
            f_level:object.f_level,
            f_archived:object.f_archived
        });
        for(m of mitigations){
            //each mitiation in form of short long
            var inserted_m = await FindingMitigation.create({
                m_brief_description: m.m_brief_description,
                m_long_description: m.m_long_description,
                f_id: inserted.f_id
            });
        }
        for(e of evidence){
            console.log("loading evidence");
            console.log(e);
            fs.readFile(e.path, async function (err,filedata){
              var inserted_e = await FindingEvidence.create({
                f_id: inserted.f_id,
                f_evidence: filedata
              });
            });
        }
        for(c of collaborators){
             var inserted_c = await FindingCollaborator.create({
                 f_id: inserted.f_id,
                 a_id: c
             });
        }
        for(a of associations){
            var f1_to_f2 = await FindingAssociation.create({
                f_id: inserted.f_id,
                assoc_f_id: a
            });
            var f2_to_f1 = await FindingAssociation.create({
                f_id: a,
                assoc_f_id: inserted.f_id,
            });
        }
        //rebuild finding with all fields as response
        res = inserted.toJSON();
        res["f_mitigations"]= await getMitigations(inserted.f_id);
        res["f_evidence"] = await getEvidence(inserted.f_id);
        res["f_collaborators"] = await getCollaborators(inserted.f_id);
        res["f_associations"] = await getAssociations(inserted.f_id);
        await t.commit();
        return res;
    }
    catch (error){
        await t.rollback();
        console.log(error);
        return error
    } 
}

exports.update = async function update(object){
  var mitigations = object.f_mitigations ? object.f_mitigations : [];
  var delMitigations = object.del_mitigations ? object.del_mitigations : [];
  var newMitigations = object.new_mitigations ? object.new_mitigations : [];
  var delEvidence = object.del_evidence ? object.del_evidence : [];
  var newEvidence = object.new_evidence ? object.new_evidence : [];
  var delCollaborators = object.del_collaborators ? object.del_collaborators : [];
  var newCollaborators = object.new_collaborators ? object.new_collaborators : [];
  var delAssociations = object.del_associations ? object.del_associations : [];
  var newAssociatons = object.new_associations ? object.new_associations : [];
  
  //calculating derived attributes
  var system = await systems.getFromId(object.s_id);
  var c_impact = object.f_confidentiality? (system.s_confidentiality=="Informational"? "X" : system.s_confidentiality) : "X";
  var i_impact = object.f_integrity? (system.s_integrity=="Informational"? "X" : system.s_integrity) : "X";
  var a_impact = object.f_availability? (system.s_availability=="Informational"? "X" : system.s_availability) : "X";
  var cat_score = fUtils.computeCATScore(object.f_cat_code);
  var impact_score = fUtils.computeImpactScore(c_impact,i_impact,a_impact);
  var vuln_severity = (cat_score * object.f_countermeasure_effectiveness_score * impact_score)/10;
  var quant_vuln_severity = fUtils.computeQuantativeVulnerabilitySeverity(vuln_severity);
  var likelihood = fUtils.computeLikelihood(object.f_relevance,quant_vuln_severity);
  var risk = fUtils.computeRisk(likelihood,object.f_impact_level);
  
  const t = await sequelize.transaction();
  try{
    var updatedFinding = await Finding.update({
      f_name:object.f_name,
      f_host_name:object.f_host_name,
      f_ip_port:object.f_ip_port,
      f_description:object.f_description,
      f_long_description:object.f_long_description,
      f_status:object.f_status,
      f_type:object.f_type,
      f_classification:object.f_classification,
      f_confidentiality:object.f_confidentiality,
      f_integrity:object.f_integrity,
      f_availability:object.f_availability,
      f_posture:object.f_posture,
      f_relevance:object.f_relevance,
      f_countermeasure_effectiveness_rating:object.f_countermeasure_effectiveness_rating,
      f_countermeasure_effectiveness_score:object.f_countermeasure_effectiveness_score,
      f_impact_desc:object.f_impact_desc,
      f_impact_level:object.f_impact_level,
      f_cat_code:object.f_cat_code,
      f_cat_score:cat_score,//derived
      f_vuln_severity:vuln_severity,//derived
      f_quant_vuln_severity:quant_vuln_severity,//derived
      f_risk:risk,//derived
      f_likelihood:likelihood,//derived
      f_confidentiality_impact:c_impact,
      f_integrity_impact:i_impact,
      f_availability_impact:a_impact,
      f_impact_score:impact_score,//derived
      a_id:object.a_id,
      s_id:object.s_id,
      t_id:object.t_id,
      st_id:object.st_id,
      f_level:object.f_level,
      f_archived:object.f_archived
    },{
      where: {
        f_id: object.f_id
      },
      returning: true,
      plain: true
    });
    for(m of mitigations){
      var updatedMitigation = await FindingMitigation.update({
        m_brief_description: m.m_brief_description,
        m_long_description: m.m_long_description,
        f_id: m.f_id
      },{
        where: {
          m_id: m.m_id
        },
        returning: true,
        plain: true
      });
    }
    for(m of delMitigations){
      var deletedMitigation = await FindingMitigation.destroy({
        where: {
          m_id: m.m_id
        }
      });
    }
    for(m of newMitigations){
      var inserted_m = await FindingMitigation.create({
        m_brief_description: m.m_brief_description,
        m_long_description: m.m_long_description,
        f_id: object.f_id
    });
    }

    for(e of delEvidence){
      var updateEvidence = await FindingEvidence.destroy({
        where: {
          fe_id: e.fe_id
        }
      });
    }
    for(e of newEvidence){
      var inserted_e = await FindingEvidence.create({
        f_id: object.f_id,
        f_evidence: e
    });
    }

    for(c of delCollaborators){
      var updatedCollaborator = await FindingCollaborator.destroy({
        where: {
          fc_id: c.fc_id
        }
      });
    }
    for(c of newCollaborators){
      var inserted_c = await FindingCollaborator.create({
        f_id: object.f_id,
        a_id: c
    });
    }

    for(a of delAssociations){
      var f1_to_f2 = await FindingAssociation.destroy({
        where: {
          f_id: a,
          assoc_f_id: object.f_id
        }
      });
      var f2_to_f1 = await FindingAssociation.destroy({
        where: {
          f_id: object.f_id,
          assoc_f_id: a
        }
      });
    }
    for(a of newAssociatons){
      var f1_to_f2 = await FindingAssociation.create({
        f_id: object.f_id,
        assoc_f_id: a
      });
      var f2_to_f1 = await FindingAssociation.create({
        f_id: a,
        assoc_f_id: object.f_id,
      });
    }
    var finding = await Finding.findAll({
      where: {
        f_id: object.f_id
      }
    });
    updatedFinding = finding[0];
    res = updatedFinding.toJSON();
    res["f_mitigations"]= await getMitigations(object.f_id);
    res["f_evidence"] = await getEvidence(object.f_id);
    res["f_collaborators"] = await getCollaborators(object.f_id);
    res["f_associations"] = await getAssociations(object.f_id);
    await t.commit();
    return res;
  }
  catch(error){
    await t.rollback()
    console.log(error);
    return error;
  }
}

exports.archive = async function archive(f_id){
  const t = await sequelize.transaction();
  try{
    var archivedFinding = await Finding.update({ f_archived: true}, {
      where: {
        f_id: f_id
      },
      returning: true,
      plain: true
    })
    await t.commit();
    return archivedFinding[1].dataValues;
  } 
  catch(err){
    await t.rollback();
    console.log(err);
    return err;
  }
}

exports.initdb = async function initdb(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
          (async () => {
            await sequelize.sync({ force: true });
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}