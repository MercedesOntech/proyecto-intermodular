const express = require('express');
const router = express.Router();
const c = require('../controllers/schedule.controller');

router.get('/', c.getAll);
router.post('/', c.create);

module.exports = router;