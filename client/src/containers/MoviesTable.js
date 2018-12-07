import React, {Component} from 'react'
import Movie from '.././components/Movie'
import Modal from '../components/Modal'
import MovieDetailsModal from '../containers/MovieDetailsModal'
import LoginModal from '../containers/LoginModal'
import { connect } from 'react-redux'
import '../styles/main.css'
import auth0client from '../containers/oauth/Auth'
import {
    favoriteMovie,
    unfavoriteMovie,
    editOpinion
} from '../actions/Movie'

class MoviesTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showDetailsModal: false,
            showLoginModal: false,
            selectedMovieId: null
        }
    }

    showDetailsModal = (id) => {
        this.setState({ selectedMovieId: id })
        this.setState({ showDetailsModal: true })
    }

    showLoginModal = () => {
        this.setState({ showLoginModal: true })
    }

    hideDetailsModal = (e) => {
        e.preventDefault()
        this.setState({ showDetailsModal: false })
    }

    hideLoginModal = (e) => {
        e.preventDefault()
        this.setState({ showLoginModal: false })
    }

    favoriteMovie = (id, title, description, imageUrl) => {
        if (!this.props.userId) {
            this.showLoginModal()
        } else {
            this.props.favoriteMovie(this.props.userId, id, title, description, imageUrl)
        }
    }

    unfavoriteMovie = (id) => {
        this.props.unfavoriteMovie(this.props.userId, id)
    }

    editOpinion = (id, opinion) => {
        this.props.editOpinion(this.props.userId, id, opinion)
    }

    createMovieList = () => {
        return this.props.movies.map(movie => {
            const favorited = this.props.activeUserFavMovies.find(userFavMovie => userFavMovie.id === movie.id) !== undefined
            
            return <li className="movie-table__item">
                <Movie
                    id={movie.id}
                    title={movie.title}
                    imageUrl={movie.imageUrl}
                    description={movie.description}
                    favorited={favorited}
                    favoritedBy={movie.favoritedBy}
                    user_id={movie.user_id}
                    isProfile={this.props.isProfile}
                    onClickImage={(id) => this.showDetailsModal(id)}
                    favoriteMovie={(id, title, description, imageUrl) => this.favoriteMovie(id, title, description, imageUrl)}
                    unfavoriteMovie={(id) => this.unfavoriteMovie(id)}/>
            </li>
        })
    }

    render() {
        const movieList = this.createMovieList()
        const selectedIsFavorited = this.props.activeUserFavMovies.find(userFavMovie => userFavMovie.id === this.state.selectedMovieId)
        const movie = this.props.movies.find(movie => movie.id === this.state.selectedMovieId)
        
        const detailsModal = this.state.showDetailsModal ? (
            <Modal>
                <div className="movie-details-modal">
                    <MovieDetailsModal 
                        id={movie.id}
                        title={movie.title}
                        imageUrl={movie.imageUrl}
                        description={movie.description}
                        favorited={selectedIsFavorited !== undefined}
                        favoritedBy={movie.favoritedBy}
                        opinion={!this.props.isActiveUserProfile ? movie.opinion : undefined}
                        activeUserOpinion={selectedIsFavorited !== undefined ? selectedIsFavorited.opinion : undefined}
                        isProfile={this.props.isProfile}
                        isActiveUserProfile={this.props.isActiveUserProfile}
                        onClose={(e) => this.hideDetailsModal(e)} 
                        editOpinion={(id, opinion) => this.editOpinion(id, opinion)}/>
                </div>
            </Modal>
        ) : null

        const loginModal = this.state.showLoginModal ? (
            <Modal>
                <div className="login-modal">
                    <LoginModal onClose={(e) => this.hideLoginModal(e)}/>
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
                {detailsModal}
                {loginModal}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    var movies = []
    const activeUserFavMovies = state.loggedInUserInfo.favoriteMovies
    const userId = state.loggedInUserInfo.id

    if (ownProps.isProfile) {
        movies = state.profile.movies
    } else {
        if (state.searchedMovies.movies.length > 0) {
            movies = state.searchedMovies.movies
        } else {
            movies = userId ? state.recentFavMovies.movies.filter(movie => movie.user_id !== userId) : state.recentFavMovies.movies
        }
    }
    
    return {
        activeUserFavMovies,
        movies,
        userId
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        favoriteMovie: (userId, id, title, description, imageUrl) => dispatch(favoriteMovie(userId, id, title, description, imageUrl)),
        unfavoriteMovie: (userId, id) => dispatch(unfavoriteMovie(userId, id)),
        editOpinion: (userId, id, opinion) => dispatch(editOpinion(userId, id, opinion))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(MoviesTable)



