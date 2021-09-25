const db = require('./database')

const util = require('util');


const query = util.promisify(db.query).bind(db);



exports.createSymptoms = async(a)=>{
    try{
        const sql =await `INSERT INTO symptoms( p_code, sy_date, sy_time, dysponea, persistent_pain, confusion, bluish_lips, ferver, ferver_value, cough, breathing, spo2, sore_throat, nasal_congestion, fatigue, myalgia, headache, anoraxia, diarrhoes, LOS, LOT, senssorium, OSTM,isRefer, UID, INDT, UPDT) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const res = await query(sql,a);
        const sql1 = await 'Select `p_code` FROM `symptoms` WHERE id =?'
        const ress = await query(sql1,res.insertId);
        const res1 = Object.values(JSON.parse(JSON.stringify(ress)));
        return res1
    }catch(err){
        throw(err);
    }
}

exports.updateSymptoms = async(a,b)=>{
    try{
        const sql =await` UPDATE symptoms SET refer_ID=? WHERE p_code='${b}'`

        const res = await query(sql,a);
        const sql1 = await `SELECT * FROM symptoms where p_code =?`
        const res1 = await query(sql1,[b])
        return res1
    }catch(err){
        throw(err);
    }
}
