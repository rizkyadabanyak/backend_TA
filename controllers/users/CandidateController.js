const CandidateRequest = require("../../request/CandidateRequest");
const jwt = require('jsonwebtoken');  // used to si
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {Candidate} = require("../../models/Candidate");
const {Job} = require("../../models/Job");
const {Category} = require("../../models/Catogory");

const accountSid = 'AC5eeb4158766e7dde48a4954d34266c49';
const authToken = '1d3d2268dd796e4b84e7695987b25da4';
const client = require('twilio')(accountSid, authToken);

require('dotenv').config()
const register = async (request, h) =>{

    const { name,username,confPassword,email,password,address,phone_number } = request.payload;

    // return address;
    const cekValidation= await CandidateRequest.regisReq(name,username ,password ,confPassword , email, phone_number );

    // return cekValidation;

    if (cekValidation.status == 'danger'){
        return h.response(cekValidation);
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {

        const data = await Candidate.create({
            candidate_name: name,
            candidate_username: username,
            candidate_email: email,
            candidate_password: hashPassword,
            candidate_address: address,
            candidate_phone_number: phone_number,
        });

        return h.response({
            message : 'success Register',
            data : null,
            status : "success"
        });

    } catch (error) {

        console.log(error);
        return h.response({
            message : error,
            data : null,
            status : "danger",
            statusCode : 400

        });

    }
}


const cekAuth = async (as,token)=>{

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
const sendOTP = async (request, h) =>{

    const req = request.payload;
    const phone_number = req?.phone_number;

    const randomDigit = Math.floor(10000 + Math.random() * 99999);
    // return randomDigit;

    const job =  await Candidate.update({
        candidate_otp: randomDigit,
        candidate_otp_update_at: Date.now(),
    },{
        where:{
            candidate_phone_number: phone_number
        }
    });

    if (job == 0){
        return h.response({
            message : 'phone number not regis in system',
            data : null,
            status : "danger",
            statusCode : 400

        }).code(400);
    }
    // return job;

    const removeNOL = phone_number.substring(1);

    // return removeNOL;

    try {
        client.messages
            .create({
                body: 'your code '+randomDigit,
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+62'+ removeNOL
            });

        return h.response({
            message : 'success send otp',
            status : "success",
            statusCode : 200

        }).code(200);

    } catch (error) {

        console.log(error);
        return h.response({
            message : error,
            data : null,
            status : "danger",
            statusCode : 400

        }).code(400);
    }

}

const verifOTP = async (request, h) =>{

    const req = request.payload;
    const phone_number = req?.phone_number;
    const otp = req?.otp;

    const data =  await Candidate.update({
        candidate_verif: 'yes',
    },{
        where:{
            candidate_otp: otp
        }
    });

    if (data == 0){
        return h.response({
            message : 'OTP not found in system',
            data : null,
            status : "danger",
            statusCode : 400
        }).code(400);
    }

    return h.response({
        message : 'success verifikasi',
        status : "success",
        statusCode : 200

    }).code(200);
    // return job;

    // return removeNOL;


}




module.exports = { register,login,cekAuth,sendOTP,verifOTP }

