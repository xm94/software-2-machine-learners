const officegen = require('officegen')
const fs = require('fs')
var findings = require("../dao/findings")
var systems = require("../dao/systems")

// Create an empty Excel object:
let xlsx = officegen('xlsx')

// Officegen calling this function after finishing to generate the xlsx document:
xlsx.on('finalize', function(written) {
  console.log(
    'Finish to create a Microsoft Excel document.'
  )
})
// Officegen calling this function to report errors:
xlsx.on('error', function(err) {
    console.log(err)
  })

const systemCols = ['Confidentiality','Integrity','Availability']
const findingCols = ['ID','Host Name','IP:Port','Finding Type','Description','Long Description','Status','Posture','C','I','A','C','I','A',
                    'Impact Score','CAT','CAT Score','CM','Vs(n)','Vs(q)','Relevance of Threat','Likelihood','Impact','Impact Rationale',
                    'Risk','Mitigation 1-Liner','Mitigation','Analyst']

exports.generateFromEvent=async function generateFromEvent(e_id,e_name,e_type){
    const curDate = new Date(Date.now())
    var filename = e_name + " Risk Matrix - " + curDate.toUTCString().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    let out = fs.createWriteStream(filename + '.xlsx')
    out.on('error', function(err) {
        console.log(err)
      })
    var path = process.cwd() + "/" + filename + '.xlsx';
    let sheet = xlsx.makeNewSheet()
    sheet.name = 'Officegen Excel'
    sheet.data[0] = []
    sheet.data[0][0] = e_name
    sheet.data[1] = []
    sheet.data[1][0] = e_type
    sheet.data[2] = []
    var startingRow = 3
    var systemList = await systems.getFromEventId(e_id);
    for(s of systemList){
        var findingList = await findings.getFromSystemId(s.s_id)
        sheet.data[startingRow] = []
        sheet.data[startingRow][0] = 'System Name'
        sheet.data[startingRow+1] = []
        sheet.data[startingRow+1][0] = s.s_name
        sheet.data[startingRow+2] = []
        sheet.data[startingRow+2][0] = 'System Categorization'
        sheet.data[startingRow+3] = systemCols
        sheet.data[startingRow+4] = [s.s_confidentiality,s.s_integrity,s.s_availability]
        sheet.data[startingRow+5] = []
        sheet.data[startingRow+6] = findingCols
        startingRow=startingRow+7
        for(f of findingList){
            sheet.data[startingRow] = []
            sheet.data[startingRow][0] = f.f_id
            sheet.data[startingRow][1] = f.f_host_name
            sheet.data[startingRow][2] = f.f_ip_port
            sheet.data[startingRow][3] = f.f_classification
            sheet.data[startingRow][4] = f.f_description
            sheet.data[startingRow][5] = f.f_long_description
            sheet.data[startingRow][6] = f.f_status
            sheet.data[startingRow][7] = f.f_posture
            sheet.data[startingRow][8] = f.f_confidentiality ? "Y" : "N"
            sheet.data[startingRow][9] = f.f_integrity ? "Y" : "N"
            sheet.data[startingRow][10] = f.f_availability ? "Y" : "N"
            sheet.data[startingRow][11] = f.f_confidentiality_impact
            sheet.data[startingRow][12] = f.f_integrity_impact
            sheet.data[startingRow][13] = f.f_availability_impact
            sheet.data[startingRow][14] = f.f_impact_score
            sheet.data[startingRow][15] = f.f_cat_code
            sheet.data[startingRow][16] = f.f_cat_score
            sheet.data[startingRow][17] = f.f_countermeasure_effectiveness_score
            sheet.data[startingRow][18] = f.f_vuln_severity
            sheet.data[startingRow][19] = f.f_quant_vuln_severity
            sheet.data[startingRow][20] = f.f_relevance
            sheet.data[startingRow][21] = f.f_likelihood
            sheet.data[startingRow][22] = f.f_impact_level
            sheet.data[startingRow][23] = f.f_impact_desc
            sheet.data[startingRow][24] = f.f_risk
            sheet.data[startingRow][25] = f.f_mitigations[0].m_brief_description
            sheet.data[startingRow][26] = f.f_mitigations[0].m_long_description
            sheet.data[startingRow][27] = f.a_initials
            startingRow = startingRow+1
        }
    }
    sheet.data[startingRow] = []
    await xlsx.generate(out);
    return path;
}