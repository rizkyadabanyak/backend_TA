const {Test} = require("../models/Test");

const index = async (request, h) =>{

    try {
        const users = await Test.findAll({
            attributes:['id','name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }

    // return todos.rows
}

module.exports = { index }

