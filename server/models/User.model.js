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
        type: [{
            movieId: {
                type: Schema.Types.ObjectId, 
                ref: 'Movie',
                required: true
            },
            opinion: String
        }]
    }
})

module.exports = mongoose.model('User', UserSchema)

