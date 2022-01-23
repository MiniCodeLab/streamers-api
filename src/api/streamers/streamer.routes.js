const ActorRoutes = require('express').Router();
const {
    getAllStreamers,
    postNewStreamer,
    getStreamer } = require('./streamer.controller');
const upload = require('../../middlewares/uploadFile');

ActorRoutes.get('/', getAllStreamers)
ActorRoutes.get('/:id', getStreamer)
ActorRoutes.post('/', upload.single('img'), postNewStreamer)

module.exports = ActorRoutes