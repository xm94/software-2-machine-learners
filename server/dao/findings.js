var express = require("express");
var systems = require("../dao/systems")
var tasks = require("../dao/tasks")
var substasks = require("../dao/subtasks")
var fUtils = require("../utils/findingUtils")
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres


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
    type: DataTypes.BLOB,
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

exports.insert = async function insert(object,a_id){
    const t = await sequelize.transaction();
    //calculating derived fields
    var mitigations = object.f_mitigations;
    var evidence = object.f_evidence;
    var collaborators = object.f_collaborators;
    var associations = object.f_associations;
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
    //creating the object with both sent and derived data
    try{
        var inserted = await Finding.create({
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
            s_id:object.s_id,
            t_id:object.t_id,
            st_id:object.st_id,
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
            var inserted_e = await FindingEvidence.create({
                f_id: inserted.f_id,
                f_evidence: e
            })
        }
        for(c of collaborators){
             var inserted_c = await FindingCollaborator.create({
                 f_id: inserted.f_id,
                 a_id: c
             });
        }
        for(a in associations){
            var f1_to_f2 = await FindingAssociation.create({
                f_id: inserted.f_id,
                assoc_f_id: a
            });
            var f2_to_f1 = await FindingAssociation.create({
                f_id: a,
                assoc_f_id: inserted.f_id,
            });
        }
        await t.commit();
        //rebuild finding with all fields as response
        return inserted;
    }
    catch (error){
        await t.rollback();
        console.log(error);
        return error
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