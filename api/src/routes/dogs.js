var express = require('express');
var router = express.Router();
const axios = require('axios');
module.exports = router;

// API_KEY = 1f564a24-2c14-453e-8464-76294baef17b
router.get('/', async (req, res) => {
    try {
        const responseApi = await axios.get(`https://api.thedogapi.com/v1/breeds?${process.env.API_KEY}`);
        res.json(responseApi);
    }
    catch (err) {
        res.send(err);
    }
});