const CountryRoutes = require('express').Router();
const {
    getAllCountries,
    getCountry,
    postNewCountry } = require('./country.controller');
const upload = require('../../middlewares/uploadFile')

CountryRoutes.get('/', getAllCountries)
CountryRoutes.get('/:id', getCountry)
CountryRoutes.post('/', upload.single('img'), postNewCountry)

module.exports = CountryRoutes