const { Router } = require('express');

// Importar todos los routers;
const dogs = require('./dogs');
const dog = require('./dog');
const temperament = require('./temperament');

const router = Router();

// Configurar los routers
router.use('/dogs', dogs);
router.use('/dog', dog);
router.use('/temperament', temperament);

module.exports = router;
