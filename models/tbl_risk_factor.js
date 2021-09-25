const db = require('./database')

const util = require('util');


const query = util.promisify(db.query).bind(db);



exports.createRiskFactor = async(a)=>{
    try{
        const sql =await `INSERT INTO tbl_risk_factor(p_code, p_age, smoking, obesity, diabetes, hypertension, cardiac, lung, CBVSL, kidney, cancer, OSOSD, severit, priority, UID, INDT, UPDT) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const res = await query(sql,a);
        const sql1 = await 'Select `p_code` FROM `tbl_risk_factor` WHERE id =?'
        const ress = await query(sql1,res.insertId);
        const res1 = Object.values(JSON.parse(JSON.stringify(ress)));
        return res1
    }catch(err){
        throw(err);
    }
}

exports.updateRiskFactor = async(a,p_code)=>{
    try{
        const sql =await `UPDATE tbl_risk_factor SET p_age=?,smoking=?,obesity=?,diabetes=?,hypertension=?,cardiac=?,lung=?,CBVSL=?,kidney=?,cancer=?,OSOSD=?,severit=?,priority=?,UID=?,INDT=?,UPDT=? WHERE p_code='${p_code}'`
        const res = await query(sql,a);
        const sql1 = await `SELECT * FROM tbl_risk_factor where p_code =?`
        const res1 = await query(sql1,p_code)
        return res1
    }catch(err){
        throw(err);
    }
}


