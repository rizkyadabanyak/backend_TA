const company = require('../controllers/CompanyController.js');
const candidate = require('../controllers/users/CandidateController');
const admin = require('../controllers/AdminController.js');
const job = require('../controllers/JobController.js');
const category = require('../controllers/CategoryController.js');
const Salary = require('../controllers/SalaryController.js');
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
                message :"Berhasil Upload ke EC2 ",
                data : null,
                status : "danger",
            });
        }
    },
    {
        method: 'POST',
        path: '/candidate/register',
        config: {
            auth: false,
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            }
        },
        handler: candidate.register
    },
    {
        method: 'POST',
        path: '/candidate/login',
        config: {
            auth: false,
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: candidate.login
    },
    {
        method: 'POST',
        path: '/candidate/sendOTP',
        config: {
            auth: false,
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            }
        },
        handler: candidate.sendOTP
    },
    {
        method: 'POST',
        path: '/candidate/verifOTP',
        config: {
            auth: false,
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            }
        },
        handler: candidate.verifOTP
    },
    {
        method: 'POST',
        path: '/candidate/applyJob/{job_id}',
        config: {
            auth: 'jwt-candidate',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: job.applyJob
    },
    {
        method: 'GET',
        path: '/candidate/showApplyJob',
        config: {
            auth: 'jwt-candidate',
        },
        handler: job.showApplyJob
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
        method: 'GET',
        path: '/operation/jobApplicant',
        config: {
            auth: 'jwt',
        },
        handler: company.jobApplicant
    },
    {
        method: 'POST',
        path: '/operation/job/accept/{job_apply_id}',
        config: {
            auth: 'jwt',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: company.accept
    },
    {
        method: 'POST',
        path: '/operation/job/offerCandidate/{job_id}',
        config: {
            auth: 'jwt',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: company.accept
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
            auth: 'jwt',
        },
        handler: job.index
    },
    {
        method: 'GET',
        path: '/operation/getAll/category',
        config: {
            auth: false,
        },
        handler: category.getAllCategory
    },
    {
        method: 'GET',
        path: '/operation/getAll/salary',
        config: {
            auth: false,
        },
        handler: Salary.getAllSalary
    },
    {
        method: 'GET',
        path: '/operation/getAll/ExperienceTime',
        config: {
            auth: false,
        },
        handler: ExperienceTime.getAllExperienceTime
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
        method: 'GET',
        path: '/operation/category/show/{category_id}',
        config: {
            auth: false,
        },
        handler: category.show
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
        path: '/operation/salary/store',
        config: {
            auth: 'jwt-admin',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: Salary.store
    },
    {
        method: 'GET',
        path: '/operation/salary/index',
        config: {
            auth: 'jwt-admin',
        },
        handler: Salary.index
    },
    {
        method: 'GET',
        path: '/operation/salary/show/{salary_id}',
        config: {
            auth: 'jwt-admin',
        },
        handler: Salary.show
    },
    {
        method: 'POST',
        path: '/operation/salary/update/{salary_id}',
        config: {
            auth: 'jwt-admin',
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: { output: 'stream' },
            },
        },
        handler: Salary.update
    },
    {
        method: 'DELETE',
        path: '/operation/salary/index',
        config: {
            auth: 'jwt-admin',
        },
        handler: Salary.index
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
            auth: 'jwt-admin',
        },
        handler: ExperienceTime.index
    },
    {
        method: 'GET',
        path: '/operation/ExperienceTime/show/{experience_time_id}',
        config: {
            auth: 'jwt-admin',
        },
        handler: ExperienceTime.show
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
