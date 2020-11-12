const officegen = require('officegen')
const fs = require('fs')
var findings = require("../dao/findings")
var systems = require("../dao/systems")
var findingRiskChart = require('../utils/findingRiskChart')
var path = require('path')
var titlePath = '/Users/xavier/software-2-machine-learners/server/utils/pptx/title.png'
var bgPath = '/Users/xavier/software-2-machine-learners/server/utils/pptx/bg.png'
var cardPath = '/Users/xavier/software-2-machine-learners/server/utils/pptx/card.png'

var titleText = "U.S. ARMY COMBAT CAPABILITIES DEVELOPMENT COMMAND – DATA & ANALYSIS CENTER"
var classificationText = "UNCLASSIFIED//FOR OFFICIAL USE ONLY//DRAFT//PRE-DECISIONAL"
var header=['ID','SYSTEM','FINDING','IMPACT','RISK']


exports.generateFromEvent = async function generateFromEvent(e_id,e_name,e_type,a_name,a_title){
    var pptx = officegen({
        type: 'pptx',
        themeXml: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?> <a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="1_UNCLASSIFIED//FOUO//DRAFT//PRE-DECISIONAL"><a:themeElements><a:clrScheme name="US Army Color Palette"><a:dk1><a:srgbClr val="000000"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="FFDA3D"/></a:dk2><a:lt2><a:srgbClr val="CCCCCC"/></a:lt2><a:accent1><a:srgbClr val="333C33"/></a:accent1><a:accent2><a:srgbClr val="717365"/></a:accent2><a:accent3><a:srgbClr val="BFB8AB"/></a:accent3><a:accent4><a:srgbClr val="B8B9B2"/></a:accent4><a:accent5><a:srgbClr val="DBDCD8"/></a:accent5><a:accent6><a:srgbClr val="333333"/></a:accent6><a:hlink><a:srgbClr val="FFDA3D"/></a:hlink><a:folHlink><a:srgbClr val="BFB8AB"/></a:folHlink></a:clrScheme><a:fontScheme name="Office Classic 2"><a:majorFont><a:latin typeface="Arial"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/><a:font script="Hang" typeface="굴림"/><a:font script="Hans" typeface="黑体"/><a:font script="Hant" typeface="微軟正黑體"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Cordia New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/></a:majorFont><a:minorFont><a:latin typeface="Arial"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/><a:font script="Hang" typeface="굴림"/><a:font script="Hans" typeface="黑体"/><a:font script="Hant" typeface="微軟正黑體"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Cordia New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:shade val="51000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="80000"><a:schemeClr val="phClr"><a:shade val="93000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="94000"/><a:satMod val="135000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst><a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d><a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>' // Just copy the theme xml code from existing office document (stored in ppt\theme\theme1.xml).
    });
    pptx.on('finalize', function (written) {
        console.log(
          'Finish to create a PowerPoint file.\nTotal bytes created: ' +
            written +
            '\n'
        )  
    });
    pptx.on('error', function (err) {
        console.log(err)
    });
    const curDate = new Date(Date.now())
    var filename = e_name + " Emerging Results Brief - " + curDate.toUTCString().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    let out = fs.createWriteStream(filename + '.pptx')
    out.on('error', function(err) {
        console.log(err)
    });
    var pptxPath = process.cwd() + filename + '.pptx';
    //Title Slide Generation
    var slide = pptx.makeNewSlide()
    slide.addImage(path.resolve(titlePath), {
        y: 0,
        x: 0,
        cy: '100%',
        cx: '100%',
    });
    slide.addText(classificationText,{
        font_face:"Arial",
        font_size:8,
        color: "727365",
        cx: 713,
        cy: 16,
        x: 113,
        y: 1,
        align: 'center'
    })
    slide.addText(titleText,{
        font_face:"Arial",
        cx: 602,
        cy: 117,
        font_size:32,
        color: "000000",
        x: 28,
        y: 192,
        align: 'left'
    })
    slide.addText(e_name,{
        font_face:"Arial",
        cx: 602,
        cy: 117,
        font_size:20,
        color: "000000",
        x: 28,
        y: 405,
        align: 'left'
    })
    slide.addText(a_name,{
        font_face:"Arial",
        cx: 602,
        cy: 117,
        font_size:12,
        color: "000000",
        x: 28,
        y: 505,
        align: 'left'
    })
    slide.addText(a_title,{
        font_face:"Arial",
        cx: 602,
        cy: 117,
        font_size:12,
        color: "000000",
        x: 28,
        y: 525,
        align: 'left'
    })
    slide.addText("Cyber Experimentation & Analysis Division",{
        font_face:"Arial",
        cx: 602,
        cy: 117,
        font_size:12,
        color: "000000",
        x: 28,
        y: 545,
        align: 'left'
    })

    var allFindings = []
    var findingRisk = {"INFO":0,"VL":0,"L":0,"M":0,"H":0,"VH":0};
    var rows=[]
    rows.push(header)

    //Systems Accessed Slide
    var slide = pptx.makeNewSlide()
    slide.addImage(path.resolve(bgPath), {
        y: 0,
        x: 0,
        cy: '100%',
        cx: '100%',
    });
    slide.addText(classificationText,{
        font_face:"Arial",
        font_size:8,
        color: "727365",
        cx: 713,
        cy: 16,
        x: 113,
        y: 1,
        align: 'center'
    })
    slide.addText("SCOPE",{
        font_face:"Arial",
        font_size:20,
        color: "000000",
        bold:true,
        x: 134,
        y: 35,
        cx: 568,
        cy: 30,
    })
    slide.addText("• Systems assessed during the " + e_type +" are as follows:",{
        font_face:"Arial",
        font_size:18,
        color: "000000",
        bold:true,
        x: 35,
        y: 97,
        cx: 637,
        indentLevel: 0
    })
    var startingY = 150;
    var systemList = await systems.getFromEventId(e_id);
    for(s of systemList){
        var findingList = await findings.getFromSystemId(s.s_id);
        for(f of findingList){
            allFindings.push(f);
            findingRisk[f.f_risk]=(findingRisk[f.f_risk]+1);
            rows.push([f.f_id,s.s_name,f.f_name,f.f_impact_level,f.f_risk]);
        }
        slide.addText("- " + s.s_name,{
            font_face:"Arial",
            font_size:18,
            color: "000000",
            x: 35,
            y: startingY,
            indentLevel: 1
        })
        startingY = startingY+30;
    }

    // Table Slide
    var slide = pptx.makeNewSlide()
    slide.addImage(path.resolve(bgPath), {
        y: 0,
        x: 0,
        cy: '100%',
        cx: '100%',
    });
    slide.addText(classificationText,{
        font_face:"Arial",
        font_size:8,
        color: "727365",
        cx: 713,
        cy: 16,
        x: 113,
        y: 1,
        align: 'center'
    });
    slide.addText("FINDINGS",{
        font_face:"Arial",
        font_size:20,
        color: "000000",
        bold:true,
        x: 134,
        y: 35,
        cx: 568,
        cy: 30,
    });
    slide.addTable(rows,{});

    //ERB Card Slides
    for(f of allFindings){
        var slide = pptx.makeNewSlide()
        slide.addImage(path.resolve(bgPath), {
            y: 0,
            x: 0,
            cy: '100%',
            cx: '100%',
        });
        slide.addText(classificationText,{
            font_face:"Arial",
            font_size:8,
            color: "727365",
            cx: 713,
            cy: 16,
            x: 113,
            y: 1,
            align: 'center'
        });
        var name = f.f_name.length>24 ? f.f_name.substring(0,20) + "..." : f.f_name;
        slide.addText("FINDINGS - " + name,{
            font_face:"Arial",
            font_size:20,
            color: "000000",
            bold:true,
            x: 134,
            y: 35,
            cx: 568,
            cy: 30,
        });
        slide.addImage(path.resolve(cardPath), {
            y: 100,
            x: 80,
            cy: '80%',
            cx: '80%',
        });
        slide.addText(""+f.f_id,{
            font_face:"Times New Roman",
            font_size:5,
            color: "000000",
            bold:true,
            x: 104,
            y: 105,
            cx: 158,
            cy: 20,
        });
        slide.addText(""+f.f_impact_score,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 544,
            y: 100,
            cx: 158,
            cy: 20,
        });
        var catCodeOnly = f.f_cat_code.substring(3,f.f_cat_code.length);
        slide.addText(catCodeOnly,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 544,
            y: 125,
            cx: 158,
            cy: 20,
        });
        slide.addText(""+f.f_cat_score,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 544,
            y: 145,
            cx: 158,
            cy: 20,
        })
        slide.addText(""+f.f_vuln_severity,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 544,
            y: 165,
            cx: 158,
            cy: 20,
        })
        slide.addText(f.f_quant_vuln_severity,{
            font_face:"Times New Roman",
            font_size:10,
            bold: true,
            color: "000000",
            x: 544,
            y: 182,
            cx: 158,
            cy: 20,
        });
        slide.addText(f.f_status,{
            font_face:"Times New Roman",
            font_size:10,
            bold: true,
            color: "000000",
            x: 664,
            y: 100,
            cx: 158,
            cy: 20,
        });
        slide.addText(f.f_likelihood,{
            font_face:"Times New Roman",
            font_size:10,
            bold: true,
            color: "000000",
            x: 664,
            y: 125,
            cx: 158,
            cy: 20,
        });
        slide.addText(f.f_impact_level,{
            font_face:"Times New Roman",
            font_size:10,
            bold: true,
            color: "000000",
            x: 664,
            y: 145,
            cx: 158,
            cy: 20,
        });
        slide.addText(f.f_risk,{
            font_face:"Times New Roman",
            font_size:10,
            bold: true,
            color: "000000",
            x: 664,
            y: 165,
            cx: 158,
            cy: 20,
        });
        slide.addText(f.f_countermeasure_effectiveness_score,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 664,
            y: 182,
            cx: 158,
            cy: 20,
        });
        var c = f.f_confidentiality ? "Y" : "N"
        slide.addText(c,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 714,
            y: 182,
            cx: 158,
            cy: 20,
        });
        var i = f.f_integrity ? "Y" : "N"
        slide.addText(i,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 748,
            y: 182,
            cx: 158,
            cy: 20,
        });
        var a = f.f_availability ? "Y" : "N"
        slide.addText(a,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 782,
            y: 182,
            cx: 158,
            cy: 20,
        });
        slide.addText(f.f_impact_desc,{
            font_face:"Times New Roman",
            font_size:10,
            bold: true,
            color: "000000",
            bold: true,
            x: 534,
            y: 202,
            cx: 258,
            cy: 20,
        });
        slide.addText(f.f_host_name,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 94,
            y: 185,
            cx: 158,
            cy: 20,
        });
        slide.addText(f.f_ip_port,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 274,
            y: 185,
            cx: 158,
            cy: 20,
        });
        slide.addText(f.f_posture,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 715,
            y: 133,
            cx: 158,
            cy: 20,
        });
        slide.addText(f.f_classification,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            align: "center",
            x: 230,
            y: 247,
            cx: 558,
            cy: 20,
        });
        slide.addText(f.f_description,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            align: "center",
            x: 94,
            y: 261,
            cx: 708,
            cy: 20,
        });
        slide.addText(f.f_long_description,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 100,
            y: 278,
            cx: 708,
            cy: 20,
        });
        slide.addText(f.f_mitigations[0].m_brief_description,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            align: "center",
            x: 94,
            y: 460,
            cx: 708,
            cy: 20,
        });
        slide.addText(f.f_mitigations[0].m_long_description,{
            font_face:"Times New Roman",
            font_size:10,
            color: "000000",
            x: 100,
            y: 477,
            cx: 708,
            cy: 20,
        });
    }
    var slide = pptx.makeNewSlide();
    var vals = [findingRisk["INFO"],findingRisk["VL"],findingRisk["L"],findingRisk["M"],findingRisk["H"],findingRisk["VH"]]
    var image = await findingRiskChart.generate(vals);
    slide.addImage(path.resolve(bgPath), {
        y: 0,
        x: 0,
        cy: '100%',
        cx: '100%',
    });
    slide.addText(classificationText,{
        font_face:"Arial",
        font_size:8,
        color: "727365",
        cx: 713,
        cy: 16,
        x: 113,
        y: 1,
        align: 'center'
    });
    slide.addText("FINDINGS HISTOGRAM",{
        font_face:"Arial",
        font_size:20,
        color: "000000",
        bold:true,
        x: 134,
        y: 35,
        cx: 568,
        cy: 30,
    });
    slide.addText("Findings Risk",{
        font_face:"Arial",
        font_size:16,
        color: "000000",
        bold:true,
        x: 344,
        y: 105,
        cx: 568,
        cy: 30,
    });
    slide.addImage(path.resolve('/Users/xavier/software-2-machine-learners/server/chart.jpg'), {
        y: 160,
        x: 220,
        cy: '400',
        cx: '400',
    });
    //Histogram Slide
    await pptx.generate(out);
    return pptxPath;
}