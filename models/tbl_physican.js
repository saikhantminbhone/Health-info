const db = require('./database')

const util = require('util');


const query = util.promisify(db.query).bind(db);



exports.createPhysican = async(a)=>{
    try{
        const sql =await `INSERT INTO tbl_physican( p_code, date, time, refer_ID, IVGT, drug_id, tele_dose, tele_FREQ, tele_duration, tele_status, tele_TOD, tele_UID, tele_INDT, tele_UPDT) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const res = await query(sql,a);
        const sql1 = await 'Select * FROM `tbl_physican` WHERE id =?'
        const ress = await query(sql1,res.insertId);
        const res1 = Object.values(JSON.parse(JSON.stringify(ress)));
        return res1
    }catch(err){
        throw(err);
    }
}

exports.updatePhysican = async(a,p_code)=>{
    try{
        const sql =await `UPDATE tbl_physican SET mmt_status=?,mmt_TSD=?,mmt_QTY=?,mmt_UID=?,mmt_INDT=?,mmt_UPDT=?  WHERE p_code='${p_code}'`
        const res = await query(sql,a);
        const sql1 = await `SELECT * FROM tbl_physican where p_code =?`
        const res1 = await query(sql1,p_code)
        return res1
    }catch(err){
        throw(err);
    }
}
