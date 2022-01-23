const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        img: { type: String, trim: true },
        streamers: [{ type: Schema.Types.ObjectId, ref: "streamers", required: true }]
    },
    {
        timestamps: true
    }
);

const Country = mongoose.model('countries', countrySchema)
module.exports = Country