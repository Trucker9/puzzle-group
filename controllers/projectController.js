const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const Project = require('../models/projectModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadTourImages = upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 5 },
]);

exports.saveTourImages = catchAsync(async (req, res, next) => {
    if (!req.files.imageCover || !req.files.images) return next();

    req.body.imageCover = `project-${req.params.id}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
        .resize(1400, 1000)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`./public/img/project-images/${req.body.imageCover}`);

    // 2) Images
    // Adding image names to body
    req.body.images = [];

    await Promise.all(
        req.files.images.map(async (file, i) => {
            const filename = `project-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
            await sharp(file.buffer)
                .resize(700, 500)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`./public/img/project-images/${filename}`);

            req.body.images.push(filename);
        })
    );


    next();
});

exports.getProject = factory.getOne(Project);
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);