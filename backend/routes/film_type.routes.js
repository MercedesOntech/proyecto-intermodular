const express = require('express');
const router = express.Router();
const c = require('../controllers/film_type.controller');

router.get('/', c.getAll);
router.get('/:id', c.getById);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.delete);

module.exports = router;