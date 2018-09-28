const Movie = require('../models/movie.model')

exports.saveMovieIfDoesNotExist = (id, body) => {
    return new Promise((resolve, reject) => {
        Movie.findOne({movieId: id}, function(err, result) {
            if (err) {
                reject(err)
            }
            if (!result) {
                const movie = new Movie({
                    movieId: id,
                    title: body.title,
                    description: body.description,
                    image_url: body.imageUrl
                })
                movie.save((err) => {
                    if (err) {
                        reject(err)
                    }
                })
            }
            resolve()
        })    
    })
}








