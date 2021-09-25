const db = require('./database')

const util = require('util');


const query = util.promisify(db.query).bind(db);



exports.createHomeBase = async(a)=>{
    try{
        const sql =await `INSERT INTO tbl_home_base( p_code, GCS, anemia, jaundica, peripheral, cyanosis, temperature, BP, heart_rate, respiratory, spo2, heart_sound, oedama, cheat_abdoman, other, status, UID, INDT, UPDT) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const res = await query(sql,a);
        const sql1 = await 'Select * FROM tbl_home_base WHERE id =?'
        const ress = await query(sql1,res.insertId);
        const res1 = Object.values(JSON.parse(JSON.stringify(ress)));
        return res1
    }catch(err){
        throw(err);
    }
}

exports.updateHomeBase = async(a,p_code)=>{
    try{
        const sql =await `UPDATE tbl_home_base SET GCS=?,anemia=?,jaundica=?,peripheral=?,cyanosis=?,temperature=?,BP=?,heart_rate=?,respiratory=?,spo2=?,heart_sound=?,oedama=?,cheat_abdoman=?,other=?,status=?,UID=?,INDT=?,UPDT=?  WHERE p_code='${p_code}'`
        const res = await query(sql,a);
        const sql1 = await `SELECT * FROM tbl_home_base where p_code =?`
        const res1 = await query(sql1,p_code)
        return res1
    }catch(err){
        throw(err);
    }
}

