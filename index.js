'use strict';

const Hapi = require('@hapi/hapi');
const rotues = require('./routes/Api.js');
const JWT = require('jsonwebtoken');  // used to si

const config = require('./database/config');

// gn our content
require('dotenv').config()

const people= { // our "users database"
    1: {
        id: 1,
        name: 'Jen Jones'
    }
};

const validate = async function (decoded, request, h) {

    // do your checks to see if the person is valid
    console.log(decoded);

    if (!people[decoded.userId]) {
        return { isValid: false };
    }
    else {
        return { isValid: true };
    }
};

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register([
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