var express = require('express');
var router = express.Router();
const { Breed, Temperament, BreedTemperaments } = require('../db');
module.exports = router;

router.post('/', async (req, res) => {
    // Recibo datos del formulario para crear raza a traves del body
    const { name, height_min, height_max, weight_min, weight_max, yearsOfLife, temperaments } = req.body;
    // Chequeo que los campos obligatorios esten completos, sino retorno un msj de error
    if (!name || !height_min || !height_max|| !weight_min || !weight_max) {
        return res.send('Faltan datos en el back!');
    }
    try {
        const newBreed = await Breed.create({
            // where:{
            //     name:name
            // },
            name,
            height: `${height_min} - ${height_max} cm`,
            weight: `${weight_min} - ${weight_max} kg`,
            yearsOfLife
        });

        await newBreed.addTemperaments(temperaments); // Vincula la raza con el/los temperamento/s
        console.log('Creado con exito en el back!');
        return res.json(newBreed);
    }
    catch (error) {
        return res.send('No creado en el back!');
    }
});