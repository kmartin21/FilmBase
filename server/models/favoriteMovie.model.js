const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavoriteMovieSchema = new Schema({
    movieId: {
        type: Number, 
        required: true
    },
    opinion: {
        type: String
    }
})

module.exports = mongoose.model('FavoriteMovie', FavoriteMovieSchema)