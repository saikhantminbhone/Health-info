const db = require('./database')

const util = require('util');
const { constants } = require('buffer');

const query = util.promisify(db.query).bind(db);



exports.pCode = async function(){
    try{
        const sql = await `SELECT MAX(p_code) AS p_code FROM tbl_p_reg`;
        const res = await query(sql);
        const ress = Object.values(JSON.parse(JSON.stringify(res)));
        return ress[0]

    }catch(err){
        throw(err);
    }
}


// exports.createPatient = async (a,b,c) =>{
//     try{
//         //for insert patient infor
//         const sql = await `INSERT INTO tbl_p_reg(p_date, p_time, p_code, p_name, p_age, p_age_unit, p_sex, p_address, p_phno, p_TH, p_TSP, p_HOC, p_HHN, UID, INDT, UPDT) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
//         const res = await query(sql,a)

//         //for insert symptoms
//         const sql1 =await `INSERT INTO symptoms( p_code, sy_date, sy_time, dysponea, persistent_pain, confusion, bluish_lips, ferver, ferver_value, cough, breathing, spo2, sore_throat, nasal_congestion, fatigue, myalgia, headache, anoraxia, diarrhoes, LOS, LOT, senssorium, OSTM, UID, INDT, UPDT) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
//         const res1 = await query(sql1,b);

//         //for insert risk factor
//         const sql2 =await `INSERT INTO tbl_risk_factor(p_code, p_age, smoking, obesity, diabetes, hypertension, cardiac, lung, CBVSL, kidney, cancer, OSOSD, severit, priority, UID, INDT, UPDT) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
//         const res2 = await query(sql2,c);

//         //for return p_code form patient table
//         const sql3 = await 'Select `p_code` FROM `tbl_p_reg` WHERE id =?'
//         const res3 = await query(sql3,res.insertId);
//         const res4 = Object.values(JSON.parse(JSON.stringify(res3)));
//         return res4
//     }catch(err){
//         throw(err);
//     }
// }

exports.createPatient = async (a) =>{
    try{
        //for insert patient infor
        const sql = await `INSERT INTO tbl_p_reg(p_date, p_time, p_code, p_name, p_age, p_age_unit, p_sex, p_address, p_phno, p_TH, p_TSP, p_HOC, p_HHN, UID, INDT, UPDT) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const res = await query(sql,a)
        //for return p_code form patient table
        const sql3 = await 'Select `p_code` FROM `tbl_p_reg` WHERE id =?'
        const res3 = await query(sql3,res.insertId);
        const res4 = Object.values(JSON.parse(JSON.stringify(res3)));
        return res4
    }catch(err){
        throw(err);
    }
}

exports.updatePatient = async(a,p_code)=>{
    try{
        const sql =await `UPDATE tbl_p_reg SET p_time=?,p_code?,p_name=?,p_age=?,p_age_unit=?,p_sex=?,p_address=?,p_phno=?,p_TH=?,p_TSP=?,p_HOC=?,p_HHN=?,UID=?,INDT=?,UPDT=? WHERE p_code='${p_code}'`
        const res = await query(sql,a);
        const sql1 = await `SELECT * FROM tbl_p_reg where p_code =?`
        const res1 = await query(sql1,p_code)
        return res1
    }catch(err){
        throw(err);
    }
}