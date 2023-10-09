const Joi = require('joi');
const fs = require("fs");

const upload_file_cv = async (cv_file,candidate_username)=>{

    // return candidate_username;
    if (cv_file) {

        var random = Math.floor(Math.random() * 99999);
        const filename = cv_file.hapi.filename;
        const array_filename = filename.split(".");
        name = 'cv_file/'+candidate_username +'_'+ random +'.'+ array_filename[1];

        const path = "./uploads/" + name;
        const file = fs.createWriteStream(path);

        file.on('error', (err) => console.error(err));

        cv_file.pipe(file);

        cv_file.on('end', (err) => {
            const ret = {
                filename: cv_file.hapi.filename,
                headers: cv_file.hapi.headers
            }
            return JSON.stringify(ret);
        })

        return path;

    }
}


module.exports = {upload_file_cv}