const crypto = require('crypto');


const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const tbl_user = require('./../models/tbl_user')


exports.createUser = catchAsync(async (req,res,next)=>{

     
        let moCode; 
        moCode= await tbl_user.moCode();
        moCode= Number(moCode.mo_code) +1 ;


        if(moCode.toString().length == 1){
            moCode= '00'+moCode;
            console.log(moCode)

        }else if(moCode.toString().length == 2) {
            moCode = '0'+ moCode;
            console.log(moCode)
        }else{
            moCode;
        }



        const mo_code = 'TP'+ moCode;


        const user_login = req.body.user_login
        const user_org = req.body.user_org;
        const user_name = req.body.user_name;
        const user_type = req.body.user_type;
        const user_role = req.body.user_role;
        const user_status = 1;
        const end_date = "null";
        const UPDT = new Date().toISOString();
        const INDT = new Date().toISOString();
        const start_date = new Date().toISOString()

        //for password hash 
        const uh_password = req.body.password;
        async function hash(password) {
            return new Promise((resolve, reject) => {
                const salt = crypto.randomBytes(8).toString("hex")
        
                crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                    if (err) reject(err);
                    resolve(salt + ":" + derivedKey.toString('hex'))
                });
            })
        }
        const user_password = await hash(uh_password);

    
        //for insert user data into database
        const n_user = await tbl_user.createUser([mo_code,user_login,user_org,user_name,user_type,user_role,user_password,start_date,end_date,user_status,INDT,UPDT])
        if(!n_user){
            return (new AppError('User create fail',500))
        }

        res.status(200).json({
            status:'success',
            message:'User successfully created',
            mo_code: n_user
        })
    }
)

exports.getUser = catchAsync(async(req,res,next)=>{

    const moCode = req.body.mo_code;
    const user = await tbl_user.getUserWithCode(moCode);
    console.log(user)
    if( !user.length ){
        return next(new AppError(`User not found with this ${moCode}`,404))
    }
    
    res.status(200).json({
        status:'success',
        message:'User successfully created',
        data: user
    })
})


exports.updateUser = catchAsync( async(req,res,next)=>{
        const mo_code = req.body.mo_code;
        const user_login = req.body.user_login
        const user_org = req.body.user_org;
        const user_name = req.body.user_name;
        const user_type = req.body.user_type;
        const user_role = req.body.user_role;
        const user_status = req.body.user_status;
        const end_date = req.body.end_date;
        const UID = req.body.UID;
        const UPDT = new Date().toISOString();
        const INDT = new Date().toISOString();
        const start_date = new Date().toISOString()

        //for password hash 
        const uh_password = req.body.password;
        async function hash(password) {
            return new Promise((resolve, reject) => {
                const salt = crypto.randomBytes(8).toString("hex")
        
                crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                    if (err) reject(err);
                    resolve(salt + ":" + derivedKey.toString('hex'))
                });
            })
        }
        const user_password = await hash(uh_password);

        const updateUser = await tbl_user.updateUser([user_login,user_org,user_name,user_type,user_role,user_password,start_date,end_date,user_status,UID,INDT,UPDT],mo_code)

        res.status(201).json({
            status:'success',
            message:`successfully updated where mo code is ${mo_code}`,
            data: updateUser
        })

})




