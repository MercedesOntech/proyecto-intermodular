const express = require('express');
const router = express.Router();
const c = require('../controllers/film_has_actor.controller');

router.get('/', c.getAll);
router.post('/', c.create);
router.delete('/', c.delete);

module.exports = router;