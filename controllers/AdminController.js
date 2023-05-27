const AdminRequest = require("../request/AdminRequest");
const jwt = require('jsonwebtoken');  // used to si
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {Admin} = require("../models/Admin");
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

        const match = await bcrypt.compare(password, admin.admin_password);

        // return match;
        if(!match){
            return h.response({
                message : 'Wrong Password',
                data : null,
                status : "danger"
            }).code(400)
        }
        const userId = admin.admin_id;
        const name = admin.admin_name;
        const email = admin.admin_email;

        // return email;

        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET_ADMIN,{
            expiresIn: '1d'
        });

        await Admin.update({admin_refresh_token: accessToken},{
            where:{
                admin_id: userId
            }
        });

        return h.response({
            message : 'success Login',
            data : {
                token : accessToken
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


module.exports = { register,login }

