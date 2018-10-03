import React, {Component} from 'react'
import Movie from '.././components/Movie'

class MoviesTable extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {isRecents, moviesData} = this.props
        debugger;
        const movieItems = moviesData.map((movie) => {
            const imageUrl = movie.poster_path ? movie.poster_path : movie.image_url
            const id = movie.id ? movie.id.toString() : movie._id
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