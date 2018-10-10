import React, {Component} from 'react'
import Movie from '.././components/Movie'

class MoviesTable extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        
    }

    testingIt() {
        
    }

    render() {
        const {isRecents, moviesData} = this.props
        
        const movieItems = moviesData.map((movieData, index) => {
            const movie = movieData.movie ? movieData.movie : movieData
            const title = movie.title
            const description = movie.description
            const imageUrl = isRecents ? movie.image_url : movie.poster_path
            const id = isRecents ? movie._id : movie.id.toString()
            const user = isRecents ? {
                _id: movie.user._id,
                name: movie.user.name
            } : null

            return <li key={id}>
                <Movie isRecent={isRecents} id={id} user={user} title={title} description={description} imageUrl={imageUrl} />
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