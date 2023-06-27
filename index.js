'use strict';

const Hapi = require('@hapi/hapi');
const rotues = require('./routes/Api.js');
const JWT = require('jsonwebtoken');  // used to si
const admin = require('./controllers/AdminController.js');
const company = require('./controllers/CompanyController.js');

const config = require('./database/config');

// gn our content
require('dotenv').config()

const validate = async function (decoded, request, h) {

    // return 'xxx';
    // do your checks to see if the person is valid
    // console.log(request.auth.token);

    const as = decoded.as;
    const token = request.auth.token;
    const username_as = decoded.username_as;

    var cek = false;

    // console.log(as);
    if (as == 'admin'){
        // console.log(admin.cekAdmin());

        cek = await admin.cekAdmin(as,token);

        return { isValid: cek };
    }else if (as == 'company'){
        cek = await company.cekCompany(as,token);

        return { isValid: cek };
    }
    // return { isValid: true };

    // if (!people[decoded.userId]) {
    //     return { isValid: false };
    // }
    // else {
    //     return { isValid: true };
    // }
};

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: process.env.HOST_SERVER,
        routes: {
            cors: true,
        },
    });

    await server.register([
        {
            plugin: require('hapi-pgsql'),
            options: {
                database_url: process.env.DATABASE_URL,
            }
        },
        {
            plugin: require('hapi-auth-jwt2'),
            options: {}
        },{
            plugin: require('hapi-sequelizejs'),
            options: [
                {
                    name: 'skripsi', // identifier
                    models: [__dirname + '/server/models/**/*.js'], // paths/globs to model files
                    // ignoredModels: [__dirname + '/server/models/**/*.js'], // OPTIONAL: paths/globs to ignore files
                    sequelize: config.db, // sequelize instance
                    sync: false, // sync models - default false
                    forceSync: false, // force sync (drops tables) - default false
                },
            ],
        }
        ]);

    (async () => {
        await config.db.sync();
    })();


    server.auth.strategy('jwt', 'jwt',
        { key: process.env.ACCESS_TOKEN_SECRET, // Never Share your secret key
            validate  // validate function defined above
        });

    server.auth.strategy('jwt-admin', 'jwt',
        { key: process.env.ACCESS_TOKEN_SECRET_ADMIN, // Never Share your secret key
            validate  // validate function defined above
        });

    server.auth.default('jwt');
    server.route(rotues.rotues);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

// const token = JWT.sign(people[1], process.env.ACCESS_TOKEN_SECRET); // synchronous
// console.log(process.env.PASSWORD_DB);

init();