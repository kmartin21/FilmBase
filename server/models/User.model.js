const mongoose = require('mongoose')
const Schema = mongoose.Schema
const favoriteMovieSchema = new Schema({name: 'FavoriteMovie'})

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true
    },
    favoriteMovies: {
        type: [favoriteMovieSchema]
    }
})

module.exports = mongoose.model('User', UserSchema)

