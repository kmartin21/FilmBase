const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        type: [Number],
        ref: 'Movie'
    }
})

module.exports = mongoose.model('User', UserSchema)

