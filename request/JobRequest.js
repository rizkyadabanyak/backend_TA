const Joi = require('joi');

const job = async (category_id,salary_start_id,salary_end_id,experience_id, job_title,job_description,job_level,job_type,job_qualification,job_methode,job_closed)=>{

    // return category_id;
    const schema = Joi.object({
        category_id: Joi.required(),
        salary_start_id: Joi.required(),
        salary_end_id: Joi.required(),
        experience_id: Joi.required(),
        job_title: Joi.required(),
        job_description: Joi.required(),
        job_level: Joi.required(),
        job_type: Joi.required(),
        job_qualification: Joi.required(),
        job_methode: Joi.required(),
        job_closed: Joi.date().required(),
    });



    try {
        const value = await schema.validate({
            category_id : category_id,
            salary_start_id : salary_start_id,
            salary_end_id : salary_end_id,
            experience_id : experience_id,
            job_title : job_title,
            job_description : job_description,
            job_level : job_level,
            job_type : job_type,
            job_qualification : job_qualification,
            job_methode : job_methode,
            job_closed : job_closed,
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


module.exports = {job}