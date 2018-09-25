const Movie = require('../models/movie.model')

exports.findMovie = (id) => {
    // return new Promise((resolve, reject) => {
            console.log(id)
            Movie.findOne({movieId: `${id}`, function(err, result) {
                if(err) {
                    console.log("ERRasd: ", err)
                    reject(err)
                }
                if(result) {
                    console.log("RESULT: ", result)
                    resolve(result)
                }
            }
        })
    // })
}








