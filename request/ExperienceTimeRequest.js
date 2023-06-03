const Joi = require('joi');

const validation = async (name)=>{

    // return 'sss';
    const schema = Joi.object({
        salary: Joi.number()
            .required(),
    });
    // return password;
    try {
        const value = await schema.validate({
            salary : salary,
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


module.exports = {validation}