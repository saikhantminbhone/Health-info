const db = require('./database')

const util = require('util');


const query = util.promisify(db.query).bind(db);



exports.createOutcome = async(a)=>{
    try{
        const sql =await `INSERT INTO tbl_outcome (p_code, date, time, outcome, dc_note, UID, INDT, UPDT) VALUES (?,?,?,?,?,?,?,?)`
        const res = await query(sql,a);
        const sql1 = await 'Select * FROM `tbl_outcome` WHERE id =?'
        const ress = await query(sql1,res.insertId);
        const res1 = Object.values(JSON.parse(JSON.stringify(ress)));
        return res1

    }catch(err){
        throw(err);
    }
}


exports.updateOutcome = async(a,p_code)=>{
    try{
        const sql =await `UPDATE tbl_outcome SET date=?,time=?,outcome=?,dc_note=?,UID=?,INDT=?,UPDT=? WHERE p_code='${p_code}'`
        const res = await query(sql,a);
        const sql1 = await `SELECT * FROM tbl_outcome where p_code =?`
        const res1 = await query(sql1,p_code)
        return res1
    }catch(err){
        throw(err);
    }
}
