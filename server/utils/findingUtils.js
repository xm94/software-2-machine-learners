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

exports.computeCATScore = function computeCATScore(code){
    return cat_scores.get(code);
}

exports.computeImpactScore = function computeImpactScore(c,i,a){
    h = (c=="H"?1:0) + (i=="H"?1:0) + (a=="H"?1:0);
    m = (c=="M"?1:0) + (i=="M"?1:0) + (a=="M"?1:0);
    l = (c=="L"?1:0) + (i=="L"?1:0) + (a=="L"?1:0);
    return h==0? m==0? l==0? 0 : impact_score_table.get({level:"L",impacted:l}) : impact_score_table.get({level:"M",impacted:m}) : impact_score_table.get({level:"H",impacted:h});
}

exports.computeQuantativeVulnerabilitySeverity = function computeQuantativeVulnerabilitySeverity(vuln_severity){
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

exports.computeLikelihood = function computeLikelihood(relevance,quant_vuln_severity){
    return likelihood_table.get({threat_relevance:relevance,quant_vuln_severity:quant_vuln_severity});
}

exports.computeRisk = function computeRisk(likelihood,impact_level){
    return risk_table.get({likelihood:likelihood,impact:impact_level});
}