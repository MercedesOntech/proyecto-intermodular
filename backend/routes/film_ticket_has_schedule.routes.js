const express = require('express');
const router = express.Router();
const c = require('../controllers/film_ticket_has_schedule.controller');

router.get('/', c.getAll);
router.post('/', c.create);
router.delete('/', c.delete);

module.exports = router;