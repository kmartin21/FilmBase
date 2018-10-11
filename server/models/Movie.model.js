const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    movieId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Movie', MovieSchema)


