const db = require('./database')

const util = require('util');


const query = util.promisify(db.query).bind(db);



exports.createRefer = async(a)=>{
    try{
        const sql =await `INSERT INTO refer(p_code, date, time, emergency, UID, INDT, UPDT) VALUES (?,?,?,?,?,?,?)`
        const res = await query(sql,a);
        return res.insertId;
    }catch(err){
        throw(err);
    }
}

exports.updateRefer = async(a,p_code)=>{
    try{
        const sql =await `UPDATE refer SET date=?,time=?,emergency=?,UID=?,INDT=?,UPDT=? WHERE p_code=?`
        const res = await query(sql,a);
        const sql1 = await `SELECT * FROM refer where p_code =?`
        const res1 = await query(sql1,p_code)
        return res1
    }catch(err){
        throw(err);
    }
}


