var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const { API_KEY } = process.env;
// ME TRAIGO LAS TABLAS CREADAS EN LA DB
const { Breed, Temperament, BreedTemperaments } = require('../db');
module.exports = router;

// GUARDO LO QUE DEVUELVE LA API
const responseApi = async () => {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    return response.data;
};

router.get('/', async (req, res) => {
    const dataApi = await responseApi();
    // de dataApi tengo que filtrar los temperamentos, para despues cargarlos en la tabla Temperament, tener en cuenta que no se repitan
    try{
        let miDb = await Temperament.findAll();
        // SI NO TENGO NADA EN MI DB, LA CARGO
        if(!miDb.length){
           let temp = await Temperament.bulkCreate(dataApi);
           return res.json(temp);
        }
    }
    catch(error){
        res.send(error);
    }
});