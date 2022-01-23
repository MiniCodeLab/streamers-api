const mongoose = require('mongoose');

const streamerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        img: { type: String, trim: true },
        canal: { type: String, trim: true },
        viwers: { type: Number, trim: true },
    },
    {
        timestamps: true
    }
);

const Streamer = mongoose.model('streamers', streamerSchema)
module.exports = Streamer