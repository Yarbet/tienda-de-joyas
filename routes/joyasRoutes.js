const express = require('express');
const { getJoyas, getFilteredJoyas } = require('../controllers/joyasController');
const router = express.Router();

router.get('/joyas', getJoyas);
router.get('/joyas/filtros', getFilteredJoyas);

module.exports = router;
