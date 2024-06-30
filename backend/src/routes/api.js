// backend/src/routes/api.js
const express = require('express');
const generatorController = require('../controllers/generatorController');
const actionPlanController = require('../controllers/actionPlanController');
const authController = require('../controllers/authController');
const { validateGenerateInput, validateUnlockInput } = require('../middlewares/validation');
const csrfProtection = require('../middlewares/csrfProtection');

const router = express.Router();

router.post('/login', authController.login);
router.post('/generate', csrfProtection, validateGenerateInput, generatorController.generateResult);
router.get('/result/:id', generatorController.getResult);
router.post('/unlock-action-plan', csrfProtection, validateUnlockInput, actionPlanController.unlockActionPlan);

module.exports = router;