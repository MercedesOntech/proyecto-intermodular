const express = require('express');
const router = express.Router();
const c = require('../controllers/film_has_genre.controller');

router.get('/', c.getAll);
router.post('/', c.create);
router.delete('/', c.delete);

module.exports = router;