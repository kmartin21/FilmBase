const Movie = require('../models/movie.model')

exports.saveMovieIfDoesNotExist = (movieId, body) => {
    return new Promise((resolve, reject) => {
        Movie.findOne({ movieId: movieId }, function(err, result) {
            if (err) reject(err)

            if (!result) {
                const movie = new Movie({
                    movieId: movieId,
                    title: body.title,
                    description: body.description,
                    image_url: body.imageUrl
                })
                
                movie.save((err, mov) => {
                    if (err) reject(err)
                    resolve(mov._id)
                })
            } else {
                resolve(result._id)
            }
        })    
    })
}







