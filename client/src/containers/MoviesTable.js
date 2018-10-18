import React, {Component} from 'react'
import Movie from '.././components/Movie'
import auth0Client from '../oauth/Auth'
import Modal from '../components/Modal'
import MovieDetailsModal from '../containers/MovieDetailsModal'
import '../styles/main.css'

class MoviesTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            selectedMovie: {
                id: null,
                user: null,
                title: null,
                description: null,
                imageUrl: null,
                favorited: null
            }
        }
    }

    showModal = (selectedMovie) => {
        this.setState({ selectedMovie: selectedMovie })
        this.setState({ show: true })
    }

    hideModal = (e) => {
        e.preventDefault()
        this.setState({ show: false })
    }

    createMovieItems() {
        if (!auth0Client.isAuthenticated()) localStorage.clear()
        const {fromSearch, moviesData} = this.props
        var finalMoviesData = fromSearch ? moviesData : moviesData.slice(0).reverse()
        const storedFavMovies = localStorage.getItem("favoriteMovies")
        var favorited = false
        var favoriteMovies = []
        if (storedFavMovies !== null) {
            favoriteMovies = JSON.parse(storedFavMovies)
        }

        return finalMoviesData.map((movieData) => {
            const movie = movieData.movie ? movieData.movie : movieData
            const title = movie.title
            const description = movie.overview ? movie.overview : movie.description
            const opinion = movie.opinion ? movie.opinion : null
            var activeUserOpinion = null
            const imageUrl = movie.image_url ? movie.image_url : movie.poster_path
            const id = movie.movieId ? movie.movieId : movie.id
            const user = !fromSearch && movieData.user ? {
                _id: movieData.user._id,
                name: movieData.user.name
            } : null
            
            favorited = favoriteMovies.find(movie => movie.movieId === id) !== undefined
            if (favorited) activeUserOpinion = favoriteMovies.find(movie => movie.movieId === id).opinion 
            
            const movieObject = {
                id: id,
                user: user,
                title: title,
                description: description,
                imageUrl: imageUrl,
                favorited: favorited,
                opinion: opinion,
                activeUserOpinion: activeUserOpinion
            }
            return <li>
                <Movie id={id} user={user} title={title} description={description} imageUrl={imageUrl} favorited={favorited} onClick={() => this.showModal(movieObject)} />
            </li>
        })
    }

    render() {
        const movieItems = this.createMovieItems()

        const modal = this.state.show ? (
            <Modal>
                <div className="modal">
                    <MovieDetailsModal movie={this.state.selectedMovie} onClose={(e) => this.hideModal(e)} />
                </div>
            </Modal>
        ) : null

        return (
            <div>
                <div>
                    <ul>
                        {movieItems}
                    </ul>
                </div>
                {modal}
            </div>
        )
    }
}

export default MoviesTable