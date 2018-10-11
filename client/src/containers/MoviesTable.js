import React, {Component} from 'react'
import Movie from '.././components/Movie'

class MoviesTable extends Component {

    constructor(props) {
        super(props)
    }

    createMovieItems() {
        const {isRecents, moviesData} = this.props
        var finalMoviesData = isRecents ? moviesData.slice(0).reverse() : moviesData
        return finalMoviesData.map((movieData) => {
            const movie = movieData.movie ? movieData.movie : movieData
            const title = movie.title
            const description = movie.overview
            const imageUrl = isRecents ? movie.image_url : movie.poster_path
            const id = isRecents ? movie._id : movie.id.toString()
            const user = isRecents ? {
                _id: movieData.user._id,
                name: movieData.user.name
            } : null

            return <li key={id}>
                <Movie isRecent={isRecents} id={id} user={user} title={title} description={description} imageUrl={imageUrl} />
            </li>
        })
    }

    render() {
        
        const movieItems = this.createMovieItems()

        return (
            <div>
                <ul>
                    {movieItems}
                </ul>
            </div>
        )
    }
}

export default MoviesTable