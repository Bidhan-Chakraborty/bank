const express = require('express');
const router = express.Router();

const { verifyToken } = require('../controllers/admin/auth');
const authController = require('../controllers/admin/auth');
const bankController = require('../controllers/admin/bank');
const { authValidationRules } = require('../validations/admin/authRequest')
const { validate } = require('../helpers/error')

router.post('/register', authValidationRules('register'), validate, authController.register);
router.post('/login', authValidationRules('login'), validate, authController.login);
router.post('/profile', verifyToken, authController.getProfile);
router.post('/token', authValidationRules('token'), validate, authController.token);
router.post('/logout', verifyToken, authValidationRules('token'), validate, authController.logout);
router.post('/import-csv', bankController.importCSV);
router.get('/api/branches/autocomplete', verifyToken, bankController.getAutocompleteBranches);
router.get('/api/branches', verifyToken, bankController.getBranches);

module.exports = router;