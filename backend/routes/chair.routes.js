const express = require('express');
const router = express.Router();
const c = require('../controllers/chair.controller');

router.get('/', c.getAll);
router.post('/', c.create);

module.exports = router;