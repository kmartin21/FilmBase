import React, {Component} from 'react'
import Movie from '.././components/Movie'
import Modal from '../components/Modal'
import MovieDetailsModal from '../containers/MovieDetailsModal'
import { connect } from 'react-redux'
import '../styles/main.css'

class MoviesTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            selectedMovie: {}
        }
    }

    showModal = (favorited, id) => {
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

    createMovieList = () => {
        const favorited = false
       
        return this.props.movies.map(movie => (
            <li>
                <Movie
                    movie={movie}
                    isActiveUserProfile={this.props.isActiveUserProfile}
                    onClick={(favorited) => this.showModal(favorited, movie)}
                    onRemoveMovie={(id) => this.removeMovie(id)}/>
            </li>
        ))
    }

    render() {
        const movieList = this.createMovieList()
        const favorited = false
        const modal = this.state.show ? (
            <Modal>
                <div className="modal">
                    <MovieDetailsModal 
                        id={this.state.selectedMovie.id}
                        title={this.state.selectedMovie.title}
                        imageUrl={this.state.selectedMovie.imageUrl}
                        description={this.state.selectedMovie.description}
                        favorited={favorited}
                        favoritedBy={this.state.selectedMovie.favoritedBy}
                        opinion={this.state.selectedMovie.opinion}
                        isProfile={this.props.isProfile}
                        isActiveUserProfile={this.props.isActiveUserProfile}
                        onClose={(e) => this.hideModal(e)} 
                        onRemoveMovie={(id) => this.removeMovie(id)} />
                </div>
            </Modal>
        ) : null

        return (
            <div>
                <div>
                    <ul>
                        {movieList}
                    </ul>
                </div>
                {modal}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    var movies = []
    const activeUserFavMovies = state.loggedInUserInfo.favMovies

    if (ownProps.isProfile) {
        movies = state.profile.movies
    } else {
        movies = state.searchedMovies.movies.length > 0 ? state.searchedMovies.movies : state.recentFavMovies.movies
    }
    
    return {
        activeUserFavMovies,
        movies
    }
}

export default connect(mapStateToProps)(MoviesTable)



