const express = require('express');
const router = express.Router();

const CarroController = require('./controllers/CarroController');

router.get('/carros', CarroController.searchAll);
router.patch('/carros/:codigo', CarroController.searchOne);
router.post('/carros', CarroController.insert);
router.put('/carros/:codigo', CarroController.alter);
router.delete('/carros/:codigo', CarroController.delete);

module.exports = router;