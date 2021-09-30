var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const { API_KEY } = process.env;
// ME TRAIGO LAS TABLAS CREADAS EN LA DB (QUE NECESITO ACA)
const { Breed, Temperament, BreedTemperaments } = require('../db');
// AUN NO ME TRAJE OPERADORES DE SEQUALIZE, PORQUE TODAVIA NO LOS NECESITE
module.exports = router;

// ----------------------------------> RUTAS <-------------------------------------
router.get('/', async (req, res) => {
    const { name } = req.query;
    // ----------> Si hay "name"
    if (name) {
        try {
            // Busco dentro de miDb, razas que incluyan "name" y las guardo en una constante
            const miDb = await Breed.findAll({
                attributes: ["name", "image"], // No esta temperament porque no lo tengo en el modelo Breed
                where: {
                    name: name
                },
                include: {
                    model: Temperament,
                    attributes: ['name']
                }
            });
            // Busco dentro de la API externa razas que incluyan "name" y las guardo en otra constante
            // Cuando quiera optimizar, puedo usar el endpoint que recibe un query con "name" y filtra solo
            const respuestaApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
            const miApi = [];
            for (let i = 0; i < respuestaApi.data.length; i++) {
                if (respuestaApi.data[i].name.includes(name)) {
                    let obj = {
                        name: respuestaApi.data[i].name,
                        image: respuestaApi.data[i].image.url,
                        temperament: respuestaApi.data[i].temperament,
                    }
                    miApi.push(obj);
                }
            }
            // Concateno las razas en miDb con las de la API para retornarlas
            const todaLaData = miDb.concat(miApi);
            return res.json(todaLaData);
        }
        catch (error) {
            console.log(error, 'El name ingresado no existe!')
            return res.send(error);
        }
    }
    // -----------> Si no hay "name"...
    try {
        // Traigo el contenido de miDb y la guardo en una constante
        const miDb = await Breed.findAll({
            attributes: ["name", "image"],
            include: {
                model: Temperament,
                attributes: ['name']
            }
        });
        console.log('midb------------->', miDb);
        // Traigo el contenido de la API externa y la guardo en una constante
        const respuestaApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const miApi = [];
        for (let i = 0; i < respuestaApi.data.length; i++) {
            let obj = {
                name: respuestaApi.data[i].name,
                image: respuestaApi.data[i].image.url,
                temperament: respuestaApi.data[i].temperament,
            }
            miApi.push(obj);
        }
        // Concateno las razas en miDb con las de la API para retornarlas
        const todaLaData = miDb.concat(miApi);
        return res.json(todaLaData);
    }
    catch (error) {
        console.log(error, 'todo mal');
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    //Obtener el detalle de una raza de perro en particular
    //Debe traer solo los datos pedidos en la ruta de detalle de raza de perro (imagen, nombre, temperamento, altura, peso y años de vida)
    //Incluir los temperamentos asociados
    const { id } = req.params;
    if (id) {
        if (id.includes('-')) {
            // El id corresponde a la DB
            try {
                const breedDb = await Breed.findOne({
                    where:{id:id},
                    include:{model:Temperament}                      
                });
                return res.json(breedDb);
            }
            catch (error) {
                return res.send(error);
            }
        }
        else {
            // El id corresponde a la API
            try {
                const respuestaApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
                const breedApi = respuestaApi.data.find(b => b.id === parseInt(id));
                const obj = {
                    name: breedApi.name,
                    image: breedApi.image.url,
                    temperament: breedApi.temperament,
                    height: breedApi.height.metric,
                    weight: breedApi.weight.metric,
                    years: breedApi.life_span,
                }
                return res.json(obj);
            }
            catch (error) {
                return res.send(error);
            }
        }
    }
});

