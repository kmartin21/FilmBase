const mongoose = require('mongoose')
const ObjectId = require('mongoose').ObjectId
const Schema = mongoose.schema

const MovieSchema = new Schema({
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
    },
    favorited_by: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: false
    }
})

module.exports = mongoose.model('Movie', MovieSchema)


