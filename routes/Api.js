const company = require('../controllers/CompanyController.js');
const admin = require('../controllers/AdminController.js');
const job = require('../controllers/JobController.js');
const category = require('../controllers/CategoryController.js');

const rotues = [
    {
        method: 'GET',
        path: '/',
        config: {
            auth: false,
        },
        handler: (request, h)=>{
            return h.response({
                message :"isi semua fieldsssxxxx",
                data : null,
                status : "danger",
            });
        }
    },
    {
        method: 'POST',
        path: '/admin/register',
        config: {
            auth: false,
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            }
        },
        handler: admin.register
    },
    {
        method: 'POST',
        path: '/admin/login',
        config: {
            auth: false,
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: admin.login
    },
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
        path: '/company/job/store',
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
    {
        method: 'POST',
        path: '/company/job/update/{job_id}',
        config: {
            auth: 'jwt',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: job.updateJob
    },
    {
        method: 'GET',
        path: '/company/job/getAllData',
        config: {
            auth: 'jwt',
        },
        handler: job.getAllJob
    },
    {
        method: 'POST',
        path: '/operation/category/store',
        config: {
            auth: 'jwt',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: category.store
    },
    {
        method: 'GET',
        path: '/uwus',
        config: {
            auth: 'jwt-admin',
        },
        handler: job.getAllJob
    },

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
