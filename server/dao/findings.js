var express = require("express");
var systems = require("../dao/systems")
var tasks = require("../dao/tasks")
var substasks = require("../dao/subtasks")
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/fric_test') // Example for postgres

const cat_scores = new Map();
cat_scores.set("CAT I",10);
cat_scores.set("CAT II",7);
cat_scores.set("CAT III",4);

const likelihood_table = new Map();
likelihood_table.set({threat_relevance:"Confirmed",quant_vuln_severity:"VH"},"VH");
likelihood_table.set({threat_relevance:"Confirmed",quant_vuln_severity:"H"},"H");
likelihood_table.set({threat_relevance:"Confirmed",quant_vuln_severity:"M"},"M");
likelihood_table.set({threat_relevance:"Confirmed",quant_vuln_severity:"L"},"L");
likelihood_table.set({threat_relevance:"Confirmed",quant_vuln_severity:"VL"},"VL");
likelihood_table.set({threat_relevance:"Confirmed",quant_vuln_severity:"INFO"},"INFO");
likelihood_table.set({threat_relevance:"Expected",quant_vuln_severity:"VH"},"VH");
likelihood_table.set({threat_relevance:"Expected",quant_vuln_severity:"H"},"H");
likelihood_table.set({threat_relevance:"Expected",quant_vuln_severity:"M"},"M");
likelihood_table.set({threat_relevance:"Expected",quant_vuln_severity:"L"},"L");
likelihood_table.set({threat_relevance:"Expected",quant_vuln_severity:"VL"},"VL");
likelihood_table.set({threat_relevance:"Expected",quant_vuln_severity:"INFO"},"INFO");
likelihood_table.set({threat_relevance:"Anticipated",quant_vuln_severity:"VH"},"H");
likelihood_table.set({threat_relevance:"Anticipated",quant_vuln_severity:"H"},"M");
likelihood_table.set({threat_relevance:"Anticipated",quant_vuln_severity:"M"},"M");
likelihood_table.set({threat_relevance:"Anticipated",quant_vuln_severity:"L"},"L");
likelihood_table.set({threat_relevance:"Anticipated",quant_vuln_severity:"VL"},"VL");
likelihood_table.set({threat_relevance:"Anticipated",quant_vuln_severity:"INFO"},"INFO");
likelihood_table.set({threat_relevance:"Predicted",quant_vuln_severity:"VH"},"M");
likelihood_table.set({threat_relevance:"Predicted",quant_vuln_severity:"H"},"L");
likelihood_table.set({threat_relevance:"Predicted",quant_vuln_severity:"M"},"L");
likelihood_table.set({threat_relevance:"Predicted",quant_vuln_severity:"L"},"L");
likelihood_table.set({threat_relevance:"Predicted",quant_vuln_severity:"VL"},"VL");
likelihood_table.set({threat_relevance:"Predicted",quant_vuln_severity:"INFO"},"INFO");
likelihood_table.set({threat_relevance:"Possible",quant_vuln_severity:"VH"},"L");
likelihood_table.set({threat_relevance:"Possible",quant_vuln_severity:"H"},"L");
likelihood_table.set({threat_relevance:"Possible",quant_vuln_severity:"M"},"L");
likelihood_table.set({threat_relevance:"Possible",quant_vuln_severity:"L"},"VL");
likelihood_table.set({threat_relevance:"Possible",quant_vuln_severity:"VL"},"VL");
likelihood_table.set({threat_relevance:"Possible",quant_vuln_severity:"INFO"},"INFO");

const risk_table = new Map();
risk_table.set({likelihood:"VH",impact:"VH"},"VH");
risk_table.set({likelihood:"VH",impact:"H"},"H");
risk_table.set({likelihood:"VH",impact:"M"},"M");
risk_table.set({likelihood:"VH",impact:"L"},"L");
risk_table.set({likelihood:"VH",impact:"VL"},"VL");
risk_table.set({likelihood:"VH",impact:"INFO"},"INFO");
risk_table.set({likelihood:"H",impact:"VH"},"VH");
risk_table.set({likelihood:"H",impact:"H"},"H");
risk_table.set({likelihood:"H",impact:"M"},"M");
risk_table.set({likelihood:"H",impact:"L"},"L");
risk_table.set({likelihood:"H",impact:"VL"},"VL");
risk_table.set({likelihood:"H",impact:"INFO"},"INFO");
risk_table.set({likelihood:"M",impact:"VH"},"H");
risk_table.set({likelihood:"M",impact:"H"},"M");
risk_table.set({likelihood:"M",impact:"M"},"M");
risk_table.set({likelihood:"M",impact:"L"},"L");
risk_table.set({likelihood:"M",impact:"VL"},"VL");
risk_table.set({likelihood:"M",impact:"INFO"},"INFO");
risk_table.set({likelihood:"L",impact:"VH"},"M");
risk_table.set({likelihood:"L",impact:"H"},"L");
risk_table.set({likelihood:"L",impact:"M"},"L");
risk_table.set({likelihood:"L",impact:"L"},"L");
risk_table.set({likelihood:"L",impact:"VL"},"VL");
risk_table.set({likelihood:"L",impact:"INFO"},"INFO");
risk_table.set({likelihood:"VL",impact:"VH"},"L");
risk_table.set({likelihood:"VL",impact:"H"},"L");
risk_table.set({likelihood:"VL",impact:"M"},"L");
risk_table.set({likelihood:"VL",impact:"L"},"VL");
risk_table.set({likelihood:"VL",impact:"VL"},"VL");
risk_table.set({likelihood:"VL",impact:"INFO"},"INFO");
risk_table.set({likelihood:"INFO",impact:"VH"},"INFO");
risk_table.set({likelihood:"INFO",impact:"H"},"INFO");
risk_table.set({likelihood:"INFO",impact:"M"},"INFO");
risk_table.set({likelihood:"INFO",impact:"L"},"INFO");
risk_table.set({likelihood:"INFO",impact:"VL"},"INFO");
risk_table.set({likelihood:"INFO",impact:"INFO"},"INFO");

var impact_score_table = new Map();
impact_score_table.set({level:"H",impacted:3},10);
impact_score_table.set({level:"H",impacted:2},9);
impact_score_table.set({level:"H",impacted:1},8);
impact_score_table.set({level:"M",impacted:3},7);
impact_score_table.set({level:"M",impacted:2},6);
impact_score_table.set({level:"M",impacted:1},5);
impact_score_table.set({level:"L",impacted:3},4);
impact_score_table.set({level:"L",impacted:2},3);
impact_score_table.set({level:"L",impacted:1},2);


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

function getImpactScore(c,i,a){
    h = (c=="H"?1:0) + (i=="H"?1:0) + (a=="H"?1:0);
    m = (c=="M"?1:0) + (i=="M"?1:0) + (a=="M"?1:0);
    l = (c=="L"?1:0) + (i=="L"?1:0) + (a=="L"?1:0);
    if(h=0){
        if(m=0){
            if(l=0){
                return 0;
            }
            return impact_score_table.get({level:"L",impacted:l});
        }
        return impact_score_table.get({level:"M",impacted:m});
    }
    return impact_score_table.get({level:"H",impacted:h});
}

function getQuantativeVulnerabilitySeverity(vuln_severity){
    switch(vuln_severity){
        case 0:
            return "INFO";
        case vuln_severity<5:
            return "VL";
        case vuln_severity<20:
            return "L";
        case vuln_severity<80:
            return "M";
        case vuln_severity<95:
            return "H";
        case vuln_severity<=100:
            return "VH";
    }
}

exports.insert = async function insert(object,a_id){
    //object has no derived fields
    var system = systems.getFromId(object.s_id);
    var c_impact = object.f_confidentiality? (system.s_confidentiality=="Informational"? "X" : system.s_confidentiality) : "X";
    var i_impact = object.f_integrity? (system.s_integrity=="Informational"? "X" : s_integrity) : "X";
    var a_impact = object.f_availability? (system.s_availability=="Informational"? "X" : system.s_availability) : "X";
    var cat_score = cat_scores.get(object.f_cat_code);
    var impact_score = getImpactScore(c_impact,i_impact,a_impact);
    var vuln_severity = (cat_score * object.f_countermeasure_effectiveness_score * impact_score)/10;
    var quant_vuln_severity = getQuantativeVulnerabilitySeverity(vuln_severity);
    var likelihood = likelihood_table.get({threat_relevance:object.f_relevance,quant_vuln_severity:quant_vuln_severity});
    var risk = risk_table.get({likelihood:likelihood,impact:object.f_impact_level});
    var inserted = await Event.create({
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
    return inserted;
  }


exports.initdb = async function initdb(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
          (async () => {
            await sequelize.sync();
          })();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}