const { Category } = require("../models/Catogory");
const Joi = require('joi');
const fs = require('fs');

const getAllCategory = async (request, h)=>{
    try {
        const categories = await Category.findAll();
        return h.response({
            data : categories
        });
    } catch (error) {
        console.log(error);
    }
}

const store = async (request, h)=>{
    const { category_name } = request.payload;

    // return job_img.hapi;
    var name = null;

    try {

        const Category = await Category.create({
            category_name: category_name,

        });

        return h.response({
            data : Category
        });

    } catch (error) {

        return h.response({
            message : error.errors[0].message,
            data : null,
            status : "dangerr",
            statusCode : 400

        });

    }

}



module.exports = { store, getAllCategory }

