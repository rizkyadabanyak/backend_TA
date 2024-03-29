const { SalaryEnd } = require("../models/Salary");
const fs = require('fs');
const slug= require('slug');
const { Level } = require("../models/Level");
const  LevelSeeder = require ("../seeders/LevelSeeder");;
const  TypeJobSeeder = require ("../seeders/TypeJobSeeder");;
const  MethodeJobSeeder = require ("../seeders/MethodeJobSeeder");;

const runSeeder = async (request, h)=> {
    MethodeJobSeeder.store();
    LevelSeeder.store();
    TypeJobSeeder.store();

    return true;
}

module.exports = { runSeeder }

