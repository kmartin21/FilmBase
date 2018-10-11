const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecentFavoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    }
})

module.exports = mongoose.model('RecentFavorite', RecentFavoriteSchema)