var express = require('express');
var router = express.Router();
const axios = require('axios').default;
// ME TRAIGO LAS TABLAS CREADAS EN LA DB
const { Breed, Temperament, BreedTemperaments } = require('../db');
// AUN NO ME TRAJE OPERADORES DE SEQUALIZE, PORQUE TODAVIA NO LOS NECESITE
module.exports = router;

const todaLaDataa = async () => {
    // GUARDO LO QUE DEVUELVE LA API
    const { API_KEY } = process.env;
    const responseApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    // GUARDO LO QUE TENGO EN LA TABLA
    const miDb = await Breed.findAll();
    // RETORNO LA DATA UNIFICADA
    return miDb.concat(responseApi.data);
};

router.get('/', async (req, res) => {
    const { name } = req.query;
    const todaLaData = await todaLaDataa();
    if (name) {
        // -----------> Si hay "name"...
        try {
            //Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter;
            const filterBreeds = [];
            for (let i = 0; i < todaLaData.length; i++) {
                if (todaLaData[i].name.includes(name)) {
                    let obj = {
                        name: todaLaData[i].name,
                        image: todaLaData[i].image.url,
                        temperament: todaLaData[i].temperament,
                    }
                    filterBreeds.push(obj);
                }
            }
            return res.json(filterBreeds);
        }
        //Si no existe ninguna raza de perro mostrar un mensaje adecuado  ---> ACA NO ESTA ENTRANDO EN NINGUN CASO!
        catch (error) {
            return res.status(404).send(error, 'La raza no existe!');
        }
    }
    // -----------> Si no hay "name"...
    try {
        const arrayBreeds = [];
        for (let i = 0; i < todaLaData.length; i++) {
            let obj = {
                name: todaLaData[i].name,
                image: todaLaData[i].image.url,
                temperament: todaLaData[i].temperament,
            }
            arrayBreeds.push(obj);
        }
        res.json(arrayBreeds);
    }
    catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    //Obtener el detalle de una raza de perro en particular
    //Debe traer solo los datos pedidos en la ruta de detalle de raza de perro (imagen, nombre, temperamento, altura, peso y años de vida)
    //Incluir los temperamentos asociados
    const { id } = req.params;
    const todaLaData = await todaLaDataa();
    if (id) {
        try {
            //let breedId = await Breed.findByPk(id); // YO ACA ESTOY CONSULTANDO SOLO EN MI DB
            for (let i = 0; i < todaLaData.length; i++) {
                if (todaLaData[i].id === parseInt(id)) {
                    const obj = {
                        name: todaLaData[i].name,
                        image: todaLaData[i].image.url,
                        temperament: todaLaData[i].temperament,
                        height: todaLaData[i].height.metric,
                        weight: todaLaData[i].weight.metric,
                        years: todaLaData[i].life_span,
                    };
                    return res.json(obj);
                }
            } 
        }
        catch (error) {
            res.send(error);
        }
    }
});

