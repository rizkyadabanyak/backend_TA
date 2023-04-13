// const index = require('../controllers/AdminController.js');
const company = require('../controllers/CompanyController.js');
const job = require('../controllers/JobController.js');
// const job = require('../controllers/JobController.js');
const Joi = require('@hapi/joi');

const rotues = [
    {
        method: 'POST',
        path: '/company/register',
        config: {
            auth: false,
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            }
        },
        handler: company.register
    },
    {
        method: 'POST',
        path: '/company/login',
        config: {
            auth: false,
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: company.login
    },
    {
        method: 'POST',
        path: '/company/logout',
        config: {
            auth: 'jwt',
        },
        handler: company.logout
    },
    {
        method: 'POST',
        path: '/job/store',
        config: {
            auth: 'jwt',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: job.storeJob
    },
    // {
    //     method: 'GET',
    //     path: '/company/getAllData',
    //     config: {
    //         auth: 'jwt',
    //     },
    //     handler: company.login
    // },
    // {
    //     method: 'GET',
    //     path: '/jobs/detail/{job_id}',
    //     config: {
    //         auth: 'jwt',
    //         state: {
    //             parse: true,
    //             failAction: 'error'
    //         }
    //     },
    //     handler: job.getDetailJob
    // },
    // {
    //     method: 'GET',
    //     path: '/authCoba',
    //     config: { auth: 'jwt' },
    //     handler: (request, h) => {
    //         return 'Hello Worlddqw!';
    //     }
    // },
    // {
    //     method: 'GET',
    //     path: '/test',
    //     config: { auth: 'jwt' },
    //     handler: (request, h) => {
    //         return 'ywy';
    //     }
    // },
];

module.exports = { rotues }
