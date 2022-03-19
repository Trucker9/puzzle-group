const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();


router
    .route('/add')
    .post(
        projectController.uploadTourImages,
        projectController.saveTourImages,
        projectController.createProject
    )

module.exports = router;
