const Joi = require('joi');

const regisReq = async (name,username ,password ,confPassword , email)=>{

    // return 'sss';
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .required(),
        name: Joi.string()
            .required(),
        confPassword: Joi.ref("password"),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
            .required(),
    }).with('password', 'confPassword');
    // return password;
    try {
        const value = await schema.validate({
            username : username,
            name : name,
            password : password,
            email : email,
            confPassword : confPassword,
        });

        // return value

        if (value.error) {

            return {
                message : value.error.message,
                data : null,
                status : "danger",
                statusCode : 400
            }
        }
    }
    catch (err) {

        return err
    }

    return 'success'

}

const loginReq = async (name,username,confPassword , email, password)=>{

    // return 'sss';
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .required(),
        name: Joi.string()
            .required(),
        confPassword: Joi.ref("password"),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
            .required(),
    }).with('password', 'confPassword');

    try {
        const value = await schema.validate({
            username : username,
            name : name,
            password : password,
            email : email,
            confPassword : confPassword,
        });

        // return value

        if (value.error) {

            return {
                message : value.error.message,
                data : null,
                status : "danger",
                statusCode : 400
            }
        }
    }
    catch (err) {

        return err
    }

    return 'success'

}

module.exports = {loginReq,regisReq}