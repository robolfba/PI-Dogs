var express = require('express');
var router = express.Router();
// ME TRAIGO LAS TABLAS CREADAS EN LA DB
const { Breed, Temperament, BreedTemperaments } = require('../db');
module.exports = router;

router.post('/', async (req, res) => {
    // Recibo datos del formulario para crear raza a traves del body
    const { name, height, weight, yearsOfLife, temperament } = req.body;
    // Chequeo que los campos obligatorios esten completos, sino retorno un msj de error
    if (!name || !weight || !height) {
        return res.send('Faltan datos!');
    }
    try {
        const newBreed = await Breed.create({
            // where:{
            //     name:name
            // },
            name,
            height,
            weight,
            yearsOfLife
        });
        // Los temperamentos los voy a encontrar en la tabla (pre cargada) de Temperament
        // const temperamentDb = await Temperament.findAll({
        //     where: { name: temperament}
        // })

        await newBreed.addTemperaments(temperament); // Vincula la raza con el/los temperamento/s
        console.log('Creado con exito!');
        return res.json(newBreed);
    }
    catch (error) {
        return res.send('No creado');
    }
});