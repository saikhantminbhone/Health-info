const db = require('./database')

const util = require('util');


const query = util.promisify(db.query).bind(db);


exports.moCode = async function(){
    try{
        const sql = await `SELECT MAX(SUBSTRING(mo_code, -3)) AS mo_code FROM tbl_user`;
        const res = await query(sql);
        const ress = Object.values(JSON.parse(JSON.stringify(res)));
        return ress[0]

    }catch(err){
        throw(err);
    }
}


exports.createUser = async(userData)=>{
    try{
        const sql = await `INSERT INTO tbl_user(id, mo_code, user_login, user_org, user_name, user_type, user_role, user_password, start_date, end_date, user_status, UID,INDT, UPDT) VALUES (null,?,?,?,?,?,?,?,?,?,?,1,?,?)`

        const res = await query(sql,userData);
        console.log('ress',res.insertId)
        const sqll = await 'SELECT `mo_code` FROM `tbl_user` WHERE id =?'
        const ress = await query(sqll,res.insertId);
        const res1 = Object.values(JSON.parse(JSON.stringify(ress)));
        console.log(res1)
        return ress
    }catch(err){
        throw(err);
    }
}

exports.getUserWithCode = async (mo_code)=>{
    console.log(mo_code)
    try{
        const sql = await 'SELECT user_name from tbl_user where mo_code=?';
        const res = await query(sql,mo_code);

        return res

    }catch(err){
        throw(err);
    }
}


exports.updateUser = async(updateData,mo_code)=>{

    try{
        const sql = await `UPDATE tbl_user SET user_login=?,user_org=?,user_name=?,user_type=?,user_role=?,user_password=?,start_date=?,end_date=?,user_status=?,UID=?,INDT=?,UPDT=? WHERE mo_code = '${mo_code}' `
        const res = await query(sql,updateData);
        
        const sql1 = await `SELECT * FROM tbl_user where mo_code =?`
        const res1 = await query(sql1,mo_code)

        return res1

    }catch(err){
        throw(err);
    }
}


