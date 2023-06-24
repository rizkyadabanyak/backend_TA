const company = require('../controllers/CompanyController.js');
const admin = require('../controllers/AdminController.js');
const job = require('../controllers/JobController.js');
const category = require('../controllers/CategoryController.js');
const SalaryStart = require('../controllers/SalaryStartController.js');
const SalaryEnd= require('../controllers/SalaryEndController.js');
const ExperienceTime = require('../controllers/ExperienceTimeController.js');
const Seeder = require('../seeders/Seeder');

const rotues = [
    {
        method: 'GET',
        path: '/',
        config: {
            auth: false,
        },
        handler: (request, h)=>{
            return h.response({
                message :"isi semua uwusssss",
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
        path: '/operation/job/store',
        config: {
            auth: 'jwt',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: job.store
    },
    {
        method: 'POST',
        path: '/operation/job/update/{job_id}',
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
        path: '/operation/job/index',
        config: {
            auth: false,
        },
        handler: job.index
    },
    {
        method: 'POST',
        path: '/operation/category/store',
        config: {
            auth: 'jwt-admin',
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
        path: '/operation/category/index',
        config: {
            auth: false,
        },
        handler: category.index
    },
    {
        method: 'POST',
        path: '/operation/category/update/{category_id}',
        config: {
            auth: 'jwt-admin',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: category.update
    },
    {
        method: 'GET',
        path: '/operation/category/destroy/{category_id}',
        config: {
            auth: 'jwt-admin',
        },
        handler: category.destroy
    },
    {
        method: 'POST',
        path: '/operation/SalaryStart/store',
        config: {
            auth: 'jwt-admin',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: SalaryStart.store
    },
    {
        method: 'GET',
        path: '/operation/SalaryStart/index',
        config: {
            auth: false,
        },
        handler: SalaryStart.index
    },
    {
        method: 'POST',
        path: '/operation/SalaryStart/update/{salaryStart_id}',
        config: {
            auth: 'jwt-admin',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: SalaryStart.update
    },
    {
        method: 'POST',
        path: '/operation/SalaryEnd/store',
        config: {
            auth: 'jwt-admin',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: SalaryEnd.store
    },
    {
        method: 'GET',
        path: '/operation/SalaryEnd/index',
        config: {
            auth: false,
        },
        handler: SalaryEnd.index
    },
    {
        method: 'POST',
        path: '/operation/SalaryEnd/update/{salaryEnd_id}',
        config: {
            auth: 'jwt-admin',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: SalaryEnd.update
    },
    {
        method: 'POST',
        path: '/operation/ExperienceTime/store',
        config: {
            auth: 'jwt-admin',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: ExperienceTime.store
    },
    {
        method: 'GET',
        path: '/operation/ExperienceTime/index',
        config: {
            auth: false,
        },
        handler: ExperienceTime.index
    },
    {
        method: 'POST',
        path: '/operation/ExperienceTime/update/{experienceTime_id}',
        config: {
            auth: 'jwt-admin',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: ExperienceTime.update
    },
    {
        method: 'GET',
        path: '/uwus',
        config: {
            auth: 'jwt-admin',
        },
        handler: job.index
    },
    {
        method: 'GET',
        path: '/runSeeder',
        config: {
            auth: false,
        },
        handler: Seeder.runSeeder
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
