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
            },
            moviesData: this.props.fromSearch ? this.props.moviesData : this.props.moviesData.slice(0).reverse()
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.moviesData !== this.props.moviesData) {
            this.setState({moviesData: this.props.fromSearch ? this.props.moviesData : this.props.moviesData.slice(0).reverse()})
        }
    }

    showModal = (favorited, selectedMovie) => {
        const movie = {...selectedMovie, favorited: favorited}
        this.setState({ selectedMovie: movie })
        this.setState({ show: true })
    }

    hideModal = (e) => {
        e.preventDefault()
        this.setState({ show: false })
    }

    removeMovie = (id) => {
        const moviesData = this.state.moviesData.filter(favoriteMovie => favoriteMovie.movie.movieId !== id)
        
        this.setState({ moviesData: moviesData })
    }

    createMovieItems() {
        if (!auth0Client.isAuthenticated()) localStorage.clear()
        const {fromSearch} = this.props
        const storedFavMovies = localStorage.getItem("favoriteMovies")
        var favorited = false
        var favoriteMovies = []
        if (storedFavMovies !== null) {
            favoriteMovies = JSON.parse(storedFavMovies)
        }
        const a = this.state.moviesData
        const b= ""
        return this.state.moviesData.map((movieData) => {
            const movie = movieData.movie ? movieData.movie : movieData
            const title = movie.title
            var description = movie.overview ? movie.overview : movie.description
            if (description === undefined) description = ""
            const opinion = movie.opinion ? movie.opinion : null
            var activeUserOpinion = null
            const imageUrl = movie.image_url ? movie.image_url : movie.poster_path
            const id = movie.movieId ? movie.movieId : movie.id
            const user = !fromSearch && movieData.user ? {
                _id: movieData.user._id,
                name: movieData.user.name
            } : null
            
            if (this.props.removeable) favorited = true
            else favorited = favoriteMovies.find(movie => movie.movieId === id) !== undefined

            if (favorited && favoriteMovies.length > 0) activeUserOpinion = favoriteMovies.find(movie => movie.movieId === id).opinion 
            
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
                <Movie 
                    id={id} 
                    user={user} 
                    title={title} 
                    description={description} 
                    imageUrl={imageUrl} 
                    favorited={favorited} 
                    removeable={this.props.removeable}
                    onClick={(favorited) => this.showModal(favorited, movieObject)} 
                    onRemoveMovie={(id) => this.removeMovie(id)} />
            </li>
        })
    }

    render() {
        const movieItems = this.createMovieItems()

        const modal = this.state.show ? (
            <Modal>
                <div className="modal">
                    <MovieDetailsModal 
                        movie={this.state.selectedMovie} 
                        removeable={this.props.removeable}
                        onClose={(e) => this.hideModal(e)} 
                        onRemoveMovie={(id) => this.removeMovie(id)} />
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