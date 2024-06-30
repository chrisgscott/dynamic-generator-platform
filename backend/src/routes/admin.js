// backend/src/routes/admin.js
const express = require('express');
const adminController = require('../controllers/adminController');
const { validateGeneratorInput } = require('../middlewares/validation');
const csrfProtection = require('../middlewares/csrfProtection');

const router = express.Router();

router.post('/generators', csrfProtection, validateGeneratorInput, adminController.createGenerator);
router.get('/generators', adminController.getGenerators);
router.get('/generators/:id', adminController.getGenerator);
router.put('/generators/:id', csrfProtection, validateGeneratorInput, adminController.updateGenerator);
router.delete('/generators/:id', csrfProtection, adminController.deleteGenerator);
router.get('/submissions/:generatorId', adminController.getSubmissions);
router.get('/submission/:id', adminController.getSubmissionDetails);
router.get('/error-logs', adminController.getErrorLogs);
router.post('/clear-error-logs', csrfProtection, adminController.clearErrorLogs);

module.exports = router;