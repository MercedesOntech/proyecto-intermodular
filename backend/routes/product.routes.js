const express = require('express');
const router = express.Router();
const c = require('../controllers/product.controller');

router.get('/', c.getAll);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.delete);

module.exports = router;