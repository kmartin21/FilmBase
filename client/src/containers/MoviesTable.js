import React, {Component} from 'react'
import Movie from '.././components/Movie'

class MoviesTable extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {moviesData} = this.props
        const movieItems = moviesData.map((movie) => 
            <li key={movie.id.toString()}>
                <Movie title={movie.title} description={movie.overview} imageUrl={movie.poster_path} />
            </li>
        )

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