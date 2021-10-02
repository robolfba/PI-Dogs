var express = require('express');
var router = express.Router();
// ME TRAIGO LAS TABLAS CREADAS EN LA DB
const { Breed, Temperament, BreedTemperaments } = require('../db');
module.exports = router;

router.post('/', async (req, res) => {
    // Recibo datos del formulario para crear raza a traves del body
    const { name, height, weight, yearsOfLife, temperaments } = req.body;
    // Chequeo que los campos obligatorios esten completos, sino retorno un msj de error
    if (!name || !weight || !height) {
        return res.send('Faltan datos!');
    }
    try {
        const newBreed = await Breed.create({
            name,
            height,
            weight,
            yearsOfLife
        });
        await newBreed.addTemperaments(temperaments); // Vincula la raza con el/los temperamento/s
        return res.send('Creado con exito!');
    }
    catch (error) {
        res.send('No creado');
    }
});