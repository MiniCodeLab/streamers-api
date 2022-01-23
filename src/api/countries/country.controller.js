const Country = require('./country.model')
const { setError } = require('../../utils/error/controller');

const getAllCountries = async (req, res, next) => {
    try {
        const allCountries = await Country.find().populate('streamers');
        res.status(200).json(allCountries)
    } catch (error) {
        return next(error)
    }
}

const getCountry = async (req, res, next) => {
    try {
        const { id } = req.params
        const country = await Country.findById(id).populate('streamers');
        if (!country) {
            return next(setError(404, 'Country not found'))
        }
        return res.status(200).json(country)

    } catch (error) {
        return next(error)
    }
}

const postNewCountry = async (req, res, next) => {
    try {
        const newCountry = new Country()
        newCountry.name = req.body.name
        newCountry.streamers = req.body.streamers
        if (req.file) {
            newCountry.img = req.file.path
        }
        const countryInBd = await newCountry.save()
        return res.status(201).json(countryInBd)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAllCountries,
    getCountry,
    postNewCountry
}