const Streamer = require('./streamer.model')
const { setError } = require('../../utils/error/controller');


const getAllStreamers = async (req, res, next) => {
    try {
        const allStreamers = await Streamer.find()
        res.status(200).json(allStreamers)
    } catch (error) {
        return next(error)
    }
}

const getStreamer = async (req, res, next) => {
    try {
        const { id } = req.params
        const streamer = await Streamer.findById(id)
        if (!streamer) {
            return next(setError(404, 'Streamer not found'))
        }
        return res.status(200).json(streamer)

    } catch (error) {
        return next(error)
    }
}

const postNewStreamer = async (req, res, next) => {
    try {
        const newStreamer = new Streamer()
        newStreamer.name = req.body.name
        newStreamer.canal = req.body.canal
        newStreamer.viwers = req.body.viwers
        if (req.file) {
            newStreamer.img = req.file.path
        }
        const streamerInBd = await newStreamer.save()
        return res.status(201).json(streamerInBd)
    } catch (error) {
        return next(error)
    }
}



module.exports = {
    getAllStreamers,
    postNewStreamer,
    getStreamer
}