const AdminRequest = require("../request/AdminRequest");
const jwt = require('jsonwebtoken');  // used to si
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {Admin} = require("../models/Admin");
const {Job} = require("../models/Job");
require('dotenv').config()



const register = async (request, h) =>{

    // return 'sss';

    const { name,username,confPassword,email,password } = request.payload;

    // return password;
    const cekValidation= await AdminRequest.regisReq(name,username ,password ,confPassword , email );

    // return cekValidation;

    // return 'xxx';
    if (cekValidation.status == 'danger'){

        return h.response(cekValidation);
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {

        const admin = await Admin.create({
            admin_name: name,
            admin_username: username,
            admin_email: email,
            admin_password: hashPassword
        });

        return h.response({
            message : 'success Register',
            data : null,
            status : "success"
        });

    } catch (error) {
        return h.response({
            message : error.errors[0].message,
            data : null,
            status : "danger",
            statusCode : 400

        });
    }
}


const cekAdmin = async (as,token)=>{

    // return token;

    try {

        const data = await Admin.findOne({ where: { admin_refresh_token: token } });

        // return data;
        if (data){
            return true
        }else {
            return false
        }

    } catch (error) {
        console.log(error);
    }

}

const login = async (request, h) =>{
    // const { username, password } = request.payload;
    const req = request.payload;

    const username = req?.username;
    const password = req?.password;

    // return password;
    if (!username || !password){
        return h.response({
            message :"isi semua field",
            data : null,
            status : "danger",
            statusCode : 400
        }).code(400);
    }


    try {
        const admin = await Admin.findOne({ where: { admin_username: username } });

        // return admin;
        if (!admin){
            return h.response({
                message : 'Wrong Password',
                data : null,
                status : "danger"
            }).code(401)
        }

        const match = await bcrypt.compare(password, admin.admin_password);

        // return match;
        if(!match){
            return h.response({
                message : 'Wrong Password',
                data : null,
                status : "danger"
            }).code(401)
        }
        const userId = admin.admin_id;
        const name = admin.admin_name;
        const email = admin.admin_email;
        const username_as = admin.admin_username;
        const as = 'admin';

        // return email;

        const accessToken = jwt.sign({userId, name, email,username_as,as}, process.env.ACCESS_TOKEN_SECRET_ADMIN,{
            expiresIn: '1h'
        });

        await Admin.update({admin_refresh_token: accessToken},{
            where:{
                admin_id: userId
            }
        });

        return h.response({
            message : 'success Login',
            token : accessToken,
            data : {
                name : name,
                email : email,
                username_as : username_as,
            },
            status : "success",
            statusCode : 200
        });

        // res.json({ data : accessToken , msg:"Berhasil Login",status : "success"});
    } catch (error) {

        return h.response({
            message : error.errors[0].message,
            data : null,
            status : "danger",
            statusCode : 400

        }).code(400);
    }

}


module.exports = { register,login,cekAdmin }

