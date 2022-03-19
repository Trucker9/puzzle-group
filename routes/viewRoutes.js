const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);


router.get('/projects/:slug', viewsController.getProject);
router.get('/projects/recent/:n', viewsController.getRecentN);

router.get('/comingSoon', viewsController.getComingSoon);

router.get('/admin', viewsController.getAdminLogin);

router.get('/admin/t', viewsController.getUploadProject);


module.exports = router;