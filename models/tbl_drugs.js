const db = require('./database')

const util = require('util');


const query = util.promisify(db.query).bind(db);



exports.createDrugs = async(a)=>{
    try{
        const sql =await `INSERT INTO  tbl_drugs (  name ,  unit ) VALUES (?,?)`
        const res = await query(sql,a);
        return res.insertId;
    }catch(err){
        throw(err);
    }
}

exports.updateDrugs = async(a,p_code)=>{
    try{
        const sql =await `UPDATE tbl_drugs SET name=?,unit=? WHERE p_code = '${p_code}'`
        const res = await query(sql,a);
        const sql1 = await `SELECT * FROM tbl_drugs where p_code =?`;
        const res1 = await query(sql1,p_code)
        return res1
    }catch(err){
        throw(err);
    }
}