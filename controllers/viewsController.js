const catchAsync = require('../utils/catchAsync');
const Project = require('../models/projectModel')
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {

    const recentProjects = await Project.find().sort({_id: -1}).limit(8);

    console.log(recentProjects)

    // Getting text data
    // const studioData


    // 2) Build template

    // 3) Render that template using tour data from step 1.
    res.status(200).render('overview', {recentProjects});
});


exports.getProject = catchAsync(async (req, res, next) => {

    // 1) Get the data, for the requested tour (including reviews and guides)
    const proj = await Project.findOne({slug: req.params.slug});
    console.log(proj)
    // If no tour was found.
    if (!proj) {
        return next(new AppError('There is no tour with that name.', 404));
    }

    // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('project', {
        title: `${proj.name} پروژه `,
        proj,
    });
});

exports.getComingSoon = catchAsync(async (req, res, next) => {

    res.status(200).render('comingSoon', {
        title: ` ببخشید!`,
    });
});

exports.getRecentN = catchAsync(async (req, res, next) => {

    const n = parseInt(req.params.n);
    const recentProjects = await Project.find().sort({_id: -1}).limit(n);

    console.log(recentProjects)
    res.status(200).render('recentProjects', {
        title: "پروژه های اخیر",
        recentProjects
    });
});

exports.getAdminLogin = catchAsync(async (req, res, next) => {
    res.status(200).render('login', {
        title: "Login"
    });
});

exports.getUploadProject = catchAsync(async (req, res, next) => {
    res.status(200).render('uploadProject', {
        title: "ساخت پروژه جدید"
    });
})

