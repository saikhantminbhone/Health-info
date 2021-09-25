const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');


//models
const tbl_p_reg = require('./../models/tbl_p_reg');
const tbl_symptoms = require('./../models/tbl_symptoms');
const tbl_risk_factor = require('./../models/tbl_risk_factor')
const tbl_physican = require('./../models/tbl_physican');
const tbl_drugs = require('./../models/tbl_drugs');
const Refer = require('./../models/refer')
const tbl_home_base = require('./../models/tbl_home_base')
const tbl_outcome = require('./../models/tbl_outcome')




exports.createPatient = catchAsync (async (req,res,next)=>{
   //for create p_code
    let pCode = await null; 
        pCode= await tbl_p_reg.pCode();
        if(!pCode){
         pCode = '1001';
         
        }else{
            pCode = await Number(pCode.p_code) +1 ;
            if(pCode.toString().length == 1){
                pCode= await '100'+pCode;
            }else if(pCode.toString().length == 2) {
                pCode = await '10'+ pCode;
            }else{
                pCode;
            }
        }

    const p_code = await pCode;
    
    //for patient data
    const p_date = new Date().toISOString();
    const p_time = new Date().toLocaleTimeString();
    const p_name = req.body.name;
    const p_age = req.body.age;
    const p_age_unit = req.body.age_unit;
    const p_sex = req.body.sex;
    const p_address = req.body.address;
    const p_phno = req.body.phone;
    const p_TH = req.body.TH;
    const p_TSP = req.body.TSP;
    const p_HOC = req.body.HOC;
    const p_HHN = req.body.HHN;

    //for symptom data

    const sy_date = new Date().toISOString();
    const sy_time = new Date().toLocaleTimeString();
    const dysponea = req.body.dysponea;
    const persistent_pain = req.body.persistent_pain;
    const confusion = req.body.confusion;
    const bluish_lips = req.body.bluish_lips;
    const ferver = req.body.ferver;
    const ferver_value = req.body.ferver_value;
    const cough = req.body.cough;
    const breathing = req.body.breathing;
    const spo2 = req.body.spo2;
    const sore_throat = req.body.sore_throat;
    const nasal_congestion = req.body.nasal_congestion;
    const fatigue = req.body.fatigue;
    const myalgia = req.body.myalgia;
    const headache = req.body.headache;
    const anoraxia = req.body.anoraxia;
    const diarrhoes = req.body.diarrhoes;
    const LOS = req.body.LOS;
    const LOT = req.body.LOT;
    const senssorium = req.body.senssorium;
    const OSTM = req.body.OSTM;
    const isRefer = req.body.isRefer;

    //for risk factor
    
    const smoking = req.body.smoking;
    const obesity = req.body.obesity;
    const diabetes = req.body.diabetes;
    const hypertension = req.body.hypertension;
    const cardiac = req.body.cardiac;
    const lung = req.body.lung;
    const CBVSL = req.body.CBVSL;
    const kidney = req.body.kidney;
    const cancer = req.body.cancer;
    const OSOSD = req.body.OSOSD;
    const severit = req.body.severit;
    const priority = req.body.priority;



    //common data into three table.
    const UID = req.body.UID;
    const UPDT = new Date().toISOString();
    const INDT = new Date().toISOString();

    
    //for insert tbl_p_reg
    const patient = await tbl_p_reg.createPatient([p_date, p_time, p_code, p_name, p_age, p_age_unit, p_sex, p_address, p_phno, p_TH, p_TSP, p_HOC, p_HHN, UID, INDT, UPDT])
   
    //for insert symptoms
    const symptoms = await tbl_symptoms.createSymptoms([p_code, sy_date, sy_time, dysponea, persistent_pain, confusion, bluish_lips, ferver, ferver_value, cough, breathing, spo2, sore_throat, nasal_congestion, fatigue, myalgia, headache, anoraxia, diarrhoes, LOS, LOT, senssorium, OSTM,isRefer, UID, INDT, UPDT])
   

    //check refer or not
    if(req.body.isRefer === 1){

       
        //for refer table
        const emergency = req.body.emergency;
        const rdate = new Date().toISOString();
        const rtime = new Date().toLocaleTimeString();
        
        //insert into refer table
        const refer = await Refer.createRefer([pCode, rdate, rtime, emergency, UID, INDT, UPDT])


        //for drugs table
        const dname = req.body.dname;
        const dunit = req.body.dunit;

        const drugs = await tbl_drugs.createDrugs([dname,dunit])

        //for physican table
        const refer_ID = refer;
        const drug_id = drugs;
        const pdate = new Date().toISOString();
        const ptime = new Date().toLocaleTimeString();
        const tele_INDT = new Date().toISOString();
        const tele_UPDT = new Date().toISOString();

        const { IVGT, tele_dose, tele_FREQ, tele_duration, tele_status, tele_TOD, tele_UID} = req.body;

        //for insert tbl_physican table
        const physican = await tbl_physican.createPhysican([pCode, pdate, ptime, refer_ID, IVGT, drug_id, tele_dose, tele_FREQ, tele_duration, tele_status, tele_TOD, tele_UID, tele_INDT, tele_UPDT])

        //update symptom refer_id if refer is exist
        const referIDIntoSymptoms = await tbl_symptoms.updateSymptoms(refer,pCode);
    }


   
    //for insert tbl_risk_factor
    const riskFactor = await tbl_risk_factor.createRiskFactor([p_code, p_age, smoking, obesity, diabetes, hypertension, cardiac, lung, CBVSL, kidney, cancer, OSOSD, severit, priority, UID, INDT, UPDT])
   
    res.status(200).json({
        status:'success',
        message:`Patient register successful`,
        p_code:patient
    })
})



///////////////////////////////////////////for update physican mobile team table//////////////////////////////////////////////////
exports.updatePhysican = catchAsync (async (req,res,next)=>{
    const mmt_UPDT = new Date().toISOString();
    const mmt_INDT = new Date().toISOString();
    const {mmt_status,mmt_TSD,mmt_QTY,mmt_UID,p_code} = req.body;

    const uPhysican = await tbl_physican.updatePhysican([mmt_status,mmt_TSD,mmt_QTY,mmt_UID,mmt_INDT,mmt_UPDT],p_code)
    res.status(200).json({
        status:'success',
        message:`Physican update successfully`,
        p_code:uPhysican
    })
})


///////////////////////////////////for update symtpoms//////////////////////////////////////////////////////////
exports.updateSymptoms = catchAsync (async (req,res,next)=>{

    let p_code = req.body.p_code;
    const sy_date = new Date().toISOString();
    const sy_time = new Date().toLocaleTimeString();
    const dysponea = req.body.dysponea;
    const persistent_pain = req.body.persistent_pain;
    const confusion = req.body.confusion;
    const bluish_lips = req.body.bluish_lips;
    const ferver = req.body.ferver;
    const ferver_value = req.body.ferver_value;
    const cough = req.body.cough;
    const breathing = req.body.breathing;
    const spo2 = req.body.spo2;
    const sore_throat = req.body.sore_throat;
    const nasal_congestion = req.body.nasal_congestion;
    const fatigue = req.body.fatigue;
    const myalgia = req.body.myalgia;
    const headache = req.body.headache;
    const anoraxia = req.body.anoraxia;
    const diarrhoes = req.body.diarrhoes;
    const LOS = req.body.LOS;
    const LOT = req.body.LOT;
    const senssorium = req.body.senssorium;
    const OSTM = req.body.OSTM;
    const isRefer = req.body.isRefer;

    const UID = req.body.UID;
    const UPDT = new Date().toISOString();
    const INDT = new Date().toISOString();
    



    const symptoms = await tbl_symptoms.createSymptoms([p_code, sy_date, sy_time, dysponea, persistent_pain, confusion, bluish_lips, ferver, ferver_value, cough, breathing, spo2, sore_throat, nasal_congestion, fatigue, myalgia, headache, anoraxia, diarrhoes, LOS, LOT, senssorium, OSTM,isRefer, UID, INDT, UPDT]);
    
    //check refer or not
    if(req.body.isRefer === 1){

        
       
        //for refer table
        const emergency = req.body.emergency;
        const rdate = new Date().toISOString();
        const rtime = new Date().toLocaleTimeString();
        
        //insert into refer table
        const refer = await Refer.createRefer([p_code, rdate, rtime, emergency, UID, INDT, UPDT])


        //for drugs table
        const dname = req.body.dname;
        const dunit = req.body.dunit;

        const drugs = await tbl_drugs.createDrugs([dname,dunit])

        //for physican table
        const refer_ID = refer;
        const drug_id = drugs;
        const pdate = new Date().toISOString();
        const ptime = new Date().toLocaleTimeString();
        const tele_INDT = new Date().toISOString();
        const tele_UPDT = new Date().toISOString();

        const { IVGT, tele_dose, tele_FREQ, tele_duration, tele_status, tele_TOD, tele_UID} = req.body;

        //for insert tbl_physican table
        const physican = await tbl_physican.createPhysican([p_code, pdate, ptime, refer_ID, IVGT, drug_id, tele_dose, tele_FREQ, tele_duration, tele_status, tele_TOD, tele_UID, tele_INDT, tele_UPDT])

        //update symptom refer_id if refer is exist
        const referIDIntoSymptoms = await tbl_symptoms.updateSymptoms(refer,p_code);

    }

    res.status(200).json({
        status:'success',
        message:`Symptoms successfully inserted into ${symptoms[0].p_code}`,
        p_code:symptoms
    })
})


////////////////////////////////////for insert home base table//////////////////////////////////////////////////
exports.createHomeBase = catchAsync (async (req,res,next) =>{
    
    //get req.body data
    const UPDT = new Date().toISOString();
    const INDT = new Date().toISOString();
    const {p_code, GCS, anemia, jaundica, peripheral, cyanosis, temperature, BP, heart_rate, respiratory, spo2, heart_sound, oedama, cheat_abdoman, other, status,UID} = req.body;

    //insert data into tbl_home_base table
    const homeBase = await tbl_home_base.createHomeBase([ p_code, GCS, anemia, jaundica, peripheral, cyanosis, temperature, BP, heart_rate, respiratory, spo2, heart_sound, oedama, cheat_abdoman, other, status, UID, INDT, UPDT])

    res.status(200).json({
        status:'success',
        message:`Home base successfully created`,
        data : homeBase
    })
})


////////////////////////////////////for insert outcome table///////////////////////////////////////

exports.createOutcome = catchAsync (async (req,res,next)=>{
     //get req.body data
     const UPDT = new Date().toISOString();
     const INDT = new Date().toISOString();
     const{p_code, date, time, outcome, dc_note, UID} = req.body;
 
     //inset data into tbl_outcome
     const OC = await tbl_outcome.createOutcome([p_code, date, time, outcome, dc_note, UID, INDT, UPDT]);
 
     res.status(200).json({
         status:'success',
         message:`Outcome data successfully inserted`,
         data : OC
     })
})