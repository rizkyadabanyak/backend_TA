const { Category } = require("../models/Catogory");
const Joi = require('joi');
const fs = require('fs');
const slug= require('slug');
const {Job} = require("../models/Job");

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

    const slug_data = slug(category_name, '_');
    // return slug_data;
    try {

        const Data = await Category.create({
            category_name: category_name,
            category_slug: slug_data,
        });

        return h.response({
            data : Data
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


const update = async (request, h)=>{

    const {category_id} = request.params;
    const { category_name } = request.payload;

    const slug_data = slug(category_name, '_');

    try {

        const job =  await Category.update({
            category_name: category_name,
            category_slug: slug_data,
        },{
            where:{
                category_id: category_id
            }
        });

        return h.response({
            message : 'success edit data',
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

const index = async (request, h)=>{

    try {

        const data = await Category.findAll();

        return h.response({
            data : data
        });

    } catch (error) {
        console.log(error);
    }

}


module.exports = { store, getAllCategory,index,update }

