const officegen = require('officegen')
const fs = require('fs')
var findings = require("../dao/findings")
var systems = require("../dao/systems")
var findingRiskChart = require('../utils/findingRiskChart')
var path = require('path')
const e = require('express')
var titlePrefix = "Combat Capabilities Development Command (CCDC) Data & Analysis Center (DAC) ";


var testEvent = { 
    "e_id": "4896b5e9-8c76-4652-8e58-68b32f43c4ea",
    "e_name": "Test Event",
    "e_description": "A test event",
    "e_type": "Cooperative Vulnerability Penetration Assessment (CVPA)",
    "e_version": 1,
    "e_assessment_date": "2020-10-14T04:38:23.897Z",
    "e_org_name": "Test Org",
    "e_sec_class_title_guide": "Test Guide",
    "e_classification": "Top Secret",
    "e_declassification_date": "2020-10-14T04:38:23.897Z",
    "e_customer": "CEAD",
    "e_archived": false
  }

var testFinding = {
    "f_id": "7dac4e78-8f1c-4ecb-b39e-1fbd54a13b6d",
    "f_name": "a",
    "f_host_name": "b",
    "f_ip_port": "0.0.0.0",
    "f_description": "finding description",
    "f_long_description": "a longer finding description",
    "f_status": "Open",
    "f_type": "Lack of Authentication,",
    "f_classification": "Vulnerability",
    "f_confidentiality": true,
    "f_integrity": true,
    "f_availability": true,
    "f_posture": "Nearsider",
    "f_relevance": "Expected",
    "f_countermeasure_effectiveness_rating": "High",
    "f_countermeasure_effectiveness_score": 8,
    "f_impact_desc": "here's an impact description",
    "f_impact_level": "VH",
    "f_cat_code": "CAT II",
    "f_cat_score": 7,
    "f_vuln_severity": 56,
    "f_quant_vuln_severity": "M",
    "f_risk": "H",
    "f_likelihood": "M",
    "f_confidentiality_impact": "H",
    "f_integrity_impact": "H",
    "f_availability_impact": "H",
    "f_impact_score": 10,
    "a_id": "88f44655-39d3-4e54-a798-a8cc73d53a4e",
    "a_initials": "ZV",
    "s_id": "9cc5d5d9-af5f-46d7-b7e8-08b9f9fb23cc",
    "t_id": "9cc5d5d9-af5f-46d7-b7e8-08b9f9fb23cc",
    "st_id": "9cc5d5d9-af5f-46d7-b7e8-08b9f9fb23cc",
    "f_level": "system",
    "f_archived": false,
    "updatedAt": "2020-11-12T10:07:04.154Z",
    "createdAt": "2020-11-12T10:07:04.154Z",
    "f_mitigations": [
        {
            "m_id": "bac20e9e-7d17-4bf4-b76f-f6895218ad66",
            "m_brief_description": "first",
            "m_long_description": "first mitigation",
            "f_id": "7dac4e78-8f1c-4ecb-b39e-1fbd54a13b6d",
            "createdAt": "2020-11-12T10:07:04.164Z",
            "updatedAt": "2020-11-12T10:07:04.164Z"
        },
        {
            "m_id": "3495f58c-1a67-4226-ae73-78b2ceda313e",
            "m_brief_description": "second",
            "m_long_description": "second mitigation",
            "f_id": "7dac4e78-8f1c-4ecb-b39e-1fbd54a13b6d",
            "createdAt": "2020-11-12T10:07:04.166Z",
            "updatedAt": "2020-11-12T10:07:04.166Z"
        }
    ],
    "f_evidence": [
        {
            "fe_id": "a82faf21-8cc0-4537-a8a8-06ded7137f3f",
            "f_id": "7dac4e78-8f1c-4ecb-b39e-1fbd54a13b6d",
            "f_evidence": {
                "type": "Buffer",
                "data": [
                    98,
                    108,
                    97,
                    104
                ]
            },
            "createdAt": "2020-11-12T10:07:04.167Z",
            "updatedAt": "2020-11-12T10:07:04.167Z"
        },
        {
            "fe_id": "4356c8cd-27ae-412e-bbea-c8cc8f914e0d",
            "f_id": "7dac4e78-8f1c-4ecb-b39e-1fbd54a13b6d",
            "f_evidence": {
                "type": "Buffer",
                "data": [
                    98,
                    108,
                    101,
                    104
                ]
            },
            "createdAt": "2020-11-12T10:07:04.171Z",
            "updatedAt": "2020-11-12T10:07:04.171Z"
        }
    ],
    "f_collaborators": [],
    "f_associations": []
}

var findinglist = [testFinding]

var testTeam = [
    {a_name:"Xavier Martinez"},
    {a_name:"Erik Martinez"},
    {a_name:"Zabdi Valenciana"}
]

var finalReportTemplate = {
    "introduction":"Hello Everyone, this is a test introduction",
    "acked_individuals":["Dr. Salamah","Elsa Tai Ramirez","Ben Robertson"],
    "excutive_summary":"sample summary",
    "arch_desc":"simple description based off of diagram",
    "ts_np":"I'm not quite sure what goes here",
    "limitations":"might just put lorem ipsum in here",
    "conclusion":"a nice wrap up to this tech doc",
    "acronyms":[
        {"acronym":"CCDC","def":"Combat Capabilities Development Command"},
        {"acronym":"DAC","def":"Data & Analysis Center"}
    ],
    "dist_list":["Value 1","Value 2"]
}




exports.generate=async function generate(template,event,team,s_names,findingList){
    const curDate = new Date(Date.now())
    var filename = event.e_name + " Final Report - " + curDate.toUTCString().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    var docx = officegen({
        type: 'docx'
    });
    
    docx.on('error', function (err) {
        console.log(err)
    });
    
    var pObj = docx.createP();

    var systemTitleText = ""
    if(s_names.length==1){
        systemTitleText = s_names[0]
    }
    else{
        for(var i=0;i<s_names.length;i++){
            if(i<s_names.length-1){
                systemTitleText= systemTitleText + s_names[i] + ", "
            }
            else{
                systemTitleText= systemTitleText + "and " + s_names[i] + ""
            }
        }
    }

    pObj.addImage(path.resolve('/Users/xavier/software-2-machine-learners/server/utils/docx/image1.png'),{cx: 300, cy: 90})
    pObj.addText('November 2020',{bold:true})
    var pObj = docx.createP()
    pObj.addHorizontalLine()
    var pObj = docx.createP()
    pObj.addText(titlePrefix + systemTitleText + " " + event.e_type + " Report",{bold:true,font_size:20})
    var pObj = docx.createP()
    var pObj = docx.createP()

    pObj = docx.createP()
    pObj.addText("by ",{bold:true},{bold:true})
    if(team.length==1){
        pObj.addText(team[0].a_name+".")
    }
    else{
        for(var i=0;i<team.length;i++){
            if(i<team.length-1){
                pObj.addText(team[i].a_name + ", ",{bold:true})
            }
            else{
                pObj.addText("and " + team[i].a_name + ".",{bold:true})
            }
        }
    }
    var pObj = docx.createP()
    var pObj = docx.createP()
    var pObj = docx.createP()
    pObj.addHorizontalLine()

    pObj = docx.createP()
    pObj.addText('Classified by: ' + team[0].a_name)
    pObj = docx.createP()
    pObj.addText('Classified by: ' + event.e_sec_class_title_guide)
    pObj = docx.createP()
    pObj.addText('Declassify by: ' + event.e_declassification_date)
    var pObj = docx.createP()
    pObj.addHorizontalLine()
    docx.putPageBreak()






    pObj = docx.createP({align:'center'})
    pObj.addText('DESTRUCTION NOTICE',{bold:true})
    pObj = docx.createP()
    pObj.addText('Destroy by any method that will prevent disclosure of contents or reconstruction of the document.')
    pObj = docx.createP({align:'center'})
    pObj.addText('DISCLAIMER',{bold:true})
    pObj = docx.createP()
    pObj.addText('The findings in this report are not to be construed as an official Department of the Army position unless so specified by other official documentation.')
    pObj = docx.createP({align:'center'})
    pObj.addText('WARNING',{bold:true})
    pObj = docx.createP()
    pObj.addText('Information and data contained in this document are based on the input available at the time of preparation.')
    pObj = docx.createP({align:'center'})
    pObj.addText('TRADE NAMES',{bold:true})
    pObj = docx.createP()
    pObj.addText('The use of trade names in this report does not constitute an official endorsement or approval of the use of such commercial hardware or software.  The report may not be cited for purposes of advertisement.')
    docx.putPageBreak()

    var pObj = docx.createP();

    pObj.addImage(path.resolve('/Users/xavier/software-2-machine-learners/server/utils/docx/image1.png'),{cx: 300, cy: 90})
    pObj.addText('November 2020',{bold:true})
    var pObj = docx.createP()
    pObj.addHorizontalLine()
    var pObj = docx.createP()
    pObj.addText(titlePrefix + systemTitleText + " " + event.e_type + " Report",{bold:true,font_size:20})

    var pObj = docx.createP()
    var pObj = docx.createP()

    pObj = docx.createP()
    pObj.addText("by ",{bold:true})
    if(team.length==1){
        pObj.addText(team[0].a_name+".")
    }
    else{
        for(var i=0;i<team.length;i++){
            if(i<team.length-1){
                pObj.addText(team[i].a_name + ", ",{bold:true})
            }
            else{
                pObj.addText("and " + team[i].a_name + ".",{bold:true})
            }
        }
    }

    var pObj = docx.createP()
    pObj.addText('CCDC Data & Analysis Center',{bold:true,italic:true})
    var pObj = docx.createP()
    pObj.addText('Author(s)',{bold:true})

    var pObj = docx.createP()
    pObj.addText('Affiliation',{bold:true,italic:true})

    var pObj = docx.createP()
    var pObj = docx.createP()
    var pObj = docx.createP()
    pObj.addHorizontalLine()
    

    pObj = docx.createP()
    pObj.addText('Classified by: ' + team[0].a_name)
    pObj = docx.createP()
    pObj.addText('Classified by: ' + event.e_sec_class_title_guide)
    pObj = docx.createP()
    pObj.addText('Declassify by: ' + event.e_declassification_date)
    var pObj = docx.createP()
    pObj.addHorizontalLine()
    docx.putPageBreak()



    pObj = docx.createP()
    pObj.addText('Table Page');

    docx.putPageBreak()
    pObj = docx.createP({align: 'center'})
    pObj.addText('Table of Contents',{bold:true});
    pObj = docx.createP()
    pObj.addText('List of Figures',{ hyperlink: 'List of Figures' });
    pObj = docx.createP()
    pObj.addText('List of Tables',{ hyperlink: 'List of Tables' });
    pObj = docx.createP()
    pObj.addText('Acknowledgements',{ hyperlink: 'Acknowledgements' });
    pObj = docx.createP()
    pObj.addText('Executive Summary',{ hyperlink: 'Executive Summary' });
    pObj = docx.createP()
    pObj.addText('1. (U) INTRODUCTION',{ hyperlink: '1. (U) INTRODUCTION' });
    pObj = docx.createP({indentLeft:720})
    pObj.addText('1.1. (U) System/Network Architecture',{ hyperlink: '1.1. (U) System/Network Architecture' });
    pObj = docx.createP({indentLeft:720})
    pObj.addText('1.2. (U) Test Setup and Network Postures',{ hyperlink: '1.2. (U) Test Setup and Network Postures' });
    pObj = docx.createP({indentLeft:720})
    pObj.addText('1.3. (U) Limitations',{ hyperlink: '1.3. (U) Limitations' });
    pObj = docx.createP()
    pObj.addText('2. ' + event.e_type.toUpperCase() + ' FINDINGS',{ hyperlink: '2. ' + event.e_type.toUpperCase() + ' FINDINGS' });

    var curFinding =1;
    for(f of findingList){
        var bookmark = "2." + curFinding + ". (U) " + f.f_name
        pObj = docx.createP({indentLeft:720})
        pObj.addText("2." + curFinding + ". (U) " + f.f_name,{ hyperlink: bookmark });
        curFinding = curFinding+1;
    }

    pObj = docx.createP()
    pObj.addText('3. CONCLUSIONS AND RECOMMENDATIONS',{ hyperlink: '3. CONCLUSIONS AND RECOMMENDATIONS' });

    pObj = docx.createP()
    pObj.addText('Appendix A - List of Acronyms',{ hyperlink: 'List of Acronyms' });

    pObj = docx.createP()
    pObj.addText('Appendix B - Distribution List',{ hyperlink: 'Distribution List' });

    docx.putPageBreak()
    pObj = docx.createP({align:'center'})
    pObj.startBookmark ( 'List of Figures' );
    pObj.addText('List of Figures',{bold:true});
    pObj.endBookmark ();
    pObj = docx.createP()
    pObj.addText('List of Figures');

    var figure = 1;
    for(f of findingList){
        var fbookmark = "Figure " + figure
        pObj = docx.createP();
        pObj.addText('Figure ' + figure + ' Sample caption',{ hyperlink: fbookmark });
        figure = figure+1;
    }

    //create list of all evidence and loop through it here

    docx.putPageBreak()
    pObj = docx.createP({align:'center'})
    pObj.startBookmark ( 'List of Tables' );
    pObj.addText('List of Tables',{bold:true});
    pObj.endBookmark ();
    pObj = docx.createP()
    pObj.addText('Table 1. (S) List of Findings');
    //num findings + 1

    var tableN = 2
    for(f of findingList){
        pObj = docx.createP();
        pObj.addText('Table ' + tableN + '. describes the ' + f.f_name + ' vulnerability.');
        tableN = tableN+1
    }

    docx.putPageBreak()
    pObj = docx.createP({align:'center'})
    pObj.startBookmark ( 'Acknowledgements' );
    pObj.addText('Acknowledgements',{bold:true});
    pObj.endBookmark ();
    pObj = docx.createP()
    pObj.addText('The U.S. Army Combat Capabilities Development Command (CCDC) Data & Analysis Center (DAC) recognizes the following individuals for their contributions to this report:');
    pObj = docx.createP()
    pObj.addText('The authors are:');
    pObj = docx.createP()
    for(var i=0;i<team.length;i++){
        if(i<team.length-1){
            pObj.addText(team[i].a_name + ", ")
        }
        else{
            pObj.addText("and " + team[i].a_name + ".")
        }
    }
    pObj = docx.createP()
    pObj.addText('The authors wish to acknowledge the contributions of the following individuals for his/her assistance in the creation of this report:');
    pObj = docx.createP()
    for(var i=0;i<template.acked_individuals.length;i++){
        if(i<template.acked_individuals.length-1){
            pObj.addText(template.acked_individuals[i] + ", ")
        }
        else{
            pObj.addText("and " + template.acked_individuals[i] + ".")
        }
    }
    docx.putPageBreak()
    pObj = docx.createP({align:'center'})
    pObj.startBookmark ( 'Executive Summary' );
    pObj.addText('Executive Summary',{bold:true});
    pObj.endBookmark ();
    pObj = docx.createP();
    pObj.addText(template.excutive_summary);

    docx.putPageBreak()
    pObj = docx.createP()
    pObj.startBookmark ( '1. (U) INTRODUCTION' );
    pObj.addText('1.    (U) Introduction',{bold:true});
    pObj.endBookmark ();
    pObj = docx.createP();
    pObj.addText(template.introduction);

    docx.putPageBreak()
    pObj = docx.createP()
    pObj.startBookmark ( '1.1. (U) System/Network Architecture' );
    pObj.addText('1.1  (U) System/Network Architecture',{bold:true});
    pObj.endBookmark ();
    pObj = docx.createP();
    pObj.addText('The figure below provides an overview of the Enter System Name system/network architecture.')
    pObj = docx.createP();
    pObj.addText('<Insert a high level diagram of the system architecture>')
    pObj = docx.createP();
    pObj.addText(template.arch_desc);


    docx.putPageBreak()
    pObj = docx.createP()
    pObj.startBookmark ( '1.2. (U) Test Setup and Network Postures' );
    pObj.addText('1.2  (U) Test Setup and Network Postures',{bold:true});
    pObj.endBookmark ();
    pObj = docx.createP();
    pObj.addText(template.ts_np);
    pObj = docx.createP();
    pObj.startBookmark ( '1.3. (U) Limitations' );
    pObj.addText('1.3  (U) Limitations',{bold:true});
    pObj.endBookmark ();
    pObj = docx.createP();
    pObj.addText(template.limitations)


    docx.putPageBreak()
    pObj = docx.createP()
    pObj.startBookmark ( '2. ' + event.e_type.toUpperCase() + ' FINDINGS' );
    pObj.addText('2.    ' + event.e_type + ' Findings',{bold:true});
    pObj.endBookmark ();
    pObj = docx.createP();
    pObj.addText('(U) Table 1 lists vulnerabilities identified and validated by CCDC DAC during the ' + event.e_type + ' with their associated technical risk.');
    pObj = docx.createP({align:"center"});
    pObj.addText('Table 1. (S) List of Findings',{bold:true});
    pObj = docx.createP();

    var table = [
    [{
        val: "ID",
        opts: {
            b:true,
            align: "center",
            shd: {
                fill: "7F7F7F",
                themeFill: "text1",
                "themeFillTint": "80"
            },
            fontFamily: "Avenir Book"
        }
    },{
        val: "Description",
        opts: {
            b:true,
            color: "000000",
            align: "center",
            shd: {
                fill: "7F7F7F",
                themeFill: "text1",
                "themeFillTint": "80"
            }
        }
    },{
        val: "Likelihood",
        opts: {
            align: "center",
            b:true,
            shd: {
                fill: "7F7F7F",
                themeFill: "text1",
                "themeFillTint": "80"
            }
        }
    },
    {
        val: "Impact",
        opts: {
            align: "center",
            b:true,
            shd: {
                fill: "7F7F7F",
                themeFill: "text1",
                "themeFillTint": "80"
            }
        }
    },{
        val: "Risk",
        opts: {
            align: "center",
            b:true,
            shd: {
                fill: "7F7F7F",
                themeFill: "text1",
                "themeFillTint": "80"
            }
        }
    }]];
    var id=1
    for(f of findingList){
        var tableData = [''+id,f.f_description,f.f_likelihood,f.f_impact_level,f.f_risk];
        table.push(tableData);
        id=id+1
    }
    const style = {
        '@w:val': 'single',
        '@w:sz': '3',
        '@w:space': '1',
        '@w:color': '000000'
      }
      const borderStyle = {
        'w:top': style,
        'w:bottom': style,
        'w:left': style,
        'w:right': style,
        'w:insideH': style,
        'w:insideV': style,
      }
    var tableStyle = {
        tableColWidth: 4261,
        tableSize: 24,
        tableColor: "ada",
        fill: "7F7F7F",
        tableAlign: "left",
        tableFontFamily: "Arial",
        borderStyle: borderStyle
    }

    docx.createTable (table, tableStyle);

    var tableN = 2;
    var figure = 1;
    var curFinding =1;
    for(f of findingList){
        var bookmark = "2." + curFinding + ". (U) " + f.f_name
        var fbookmark = "Figure " + figure
        docx.putPageBreak()
        pObj = docx.createP()
        pObj.startBookmark ( bookmark );
        pObj.addText("2." + curFinding + ".    (U) " + f.f_name,{bold:true});
        pObj.endBookmark ();
        pObj = docx.createP();
        pObj.addText('Table ' + tableN + ' describes the ' + f.f_name + ' vulnerability.');
        pObj = docx.createP({align:"center"});
        pObj.addText('Table ' + tableN + '. ' + f.f_name,{bold:true});
        pObj = docx.createP({align:'center'});
        pObj.addText('<Write Up Card Here>',{bold:true});
        tableN = tableN + 1;
        docx.putPageBreak()
        pObj = docx.createP()
        pObj.addText('<Insert Finding Evidence Here>')
        pObj = docx.createP({align:"center"});
        pObj.startBookmark ( fbookmark );
        pObj.addText('Figure ' + figure + ' caption',{bold:true});
        pObj.endBookmark ();
        figure = figure+1;
        curFinding = curFinding+1;
    }

    docx.putPageBreak()
    pObj = docx.createP()
    pObj.startBookmark ( '3. CONCLUSIONS AND RECOMMENDATIONS' );
    pObj.addText('3.    Conclusions and Recommendations',{bold:true});
    pObj.endBookmark ();
    pObj = docx.createP();
    pObj.addText(template.conclusion);


    docx.putPageBreak()
    pObj = docx.createP()
    pObj.startBookmark ( 'List of Acronyms' );
    pObj.addText('A - List of Acronyms',{bold:true})
    pObj.endBookmark ();

    docx.putPageBreak()
    for(acr of template.acronyms){
        pObj = docx.createP()
        pObj.addText(acr.acronym + ' - ' + acr.def);
    }

    docx.putPageBreak()
    pObj = docx.createP()
    pObj.startBookmark ( 'Distribution List' );
    pObj.addText('B - Distribution List',{bold:true})
    pObj.endBookmark ();
    
    for(dist of template.dist_list){
        pObj = docx.createP();
        pObj.addText(dist)
    }

    docx.putPageBreak()
    pObj = docx.createP({align:'center'})
    pObj.addText('Organization',{bold:true})
    console.log(filename)
    var out = fs.createWriteStream(filename+'.docx');
    var docxPath = process.cwd() + "/" + filename + '.docx';

    await docx.generate(out)
    return docxPath;

}

