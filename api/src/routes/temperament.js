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
    const arreglo = [];
    for (let i = 0; i < dataApi.length; i++) {
        if (dataApi[i].temperament) {
            // Separo las palabras con split y las guardo en un array de strings
            let palabrasSeparadas = (dataApi[i].temperament).split(', ');
            // Pusheo cada arreglo para despues agregar todo a mi tabla Temperament
            arreglo.push(palabrasSeparadas);
        }
    }
    // Unifico todo a un unico arreglo
    const arregloDeStrings = arreglo.flat();
    // Elimino las palabras repetidas aplicando el Set

    const arregloDeStringsSinRepeticiones = new Set(arregloDeStrings);
    let arr = Array.from(arregloDeStringsSinRepeticiones);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = { name: arr[i]};
    }

    try {
        let miDb = await Temperament.findAll();
        // SI NO TENGO NADA EN MI DB, LA CARGO
        if (!miDb.length) {
            let temp = await Temperament.bulkCreate(arr);
            return res.json(temp);
        }
        else {
            return res.json(miDb);
        }
    }
    catch (error) {
        return res.send(error);
    }
});