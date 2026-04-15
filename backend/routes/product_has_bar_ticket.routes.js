const express = require('express');
const router = express.Router();
const c = require('../controllers/product_has_bar_ticket.controller');

router.get('/', c.getAll);
router.post('/', c.create);
router.delete('/', c.delete);

module.exports = router;