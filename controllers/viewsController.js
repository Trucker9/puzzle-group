const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {

    // Getting text data
    // const studioData


    // 2) Build template

    // 3) Render that template using tour data from step 1.
    res.status(200).render('overview');
});