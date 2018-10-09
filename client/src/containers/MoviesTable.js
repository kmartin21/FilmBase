import React, {Component} from 'react'
import Movie from '.././components/Movie'

class MoviesTable extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {isRecents, moviesData} = this.props
        const movieItems = moviesData.map((movieData) => {
            const movie = movieData.movie ? movieData.movie : movieData
            const imageUrl = isRecents ? movie.image_url : movie.poster_path
            const id = isRecents ? movie._id : movie.id.toString()
            return <li key={id}>
                <Movie isRecent={isRecents} id={id} title={movie.title} description={movie.overview} imageUrl={imageUrl} />
            </li>
        })

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