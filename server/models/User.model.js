const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String, 
        required: false
    },
    favoriteMovies: {
        type: [ObjectId],
        ref: 'Movie'
    }
})

module.exports = mongoose.model('User', UserSchema)

