const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// criar lead
router.post('/', leadController.createLead);

// listar leads
router.get('/', leadController.getLeads);

module.exports = router;
