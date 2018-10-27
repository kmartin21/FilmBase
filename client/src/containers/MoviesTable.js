import React, {Component} from 'react'
import Movie from '.././components/Movie'
import auth0Client from '../oauth/Auth'
import Modal from '../components/Modal'
import MovieDetailsModal from '../containers/MovieDetailsModal'
import { connect } from 'react-redux'
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
            // moviesData: this.props.fromSearch ? this.props.moviesData : this.props.moviesData.slice(0).reverse()
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.moviesData !== this.props.moviesData) {
            this.setState({moviesData: this.props.fromSearch ? this.props.moviesData : this.props.moviesData.slice(0).reverse()})
        }
    }

    showModal = (favorited, selectedMovie) => {
        const movie = {...selectedMovie, favorited: false}
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

    // createMovieItems() {
    //     if (!auth0Client.isAuthenticated()) localStorage.clear()
    //     const {fromSearch} = this.props
    //     const storedFavMovies = localStorage.getItem("favoriteMovies")
    //     var favorited = false
    //     var favoriteMovies = []
    //     if (storedFavMovies !== null) {
    //         favoriteMovies = JSON.parse(storedFavMovies)
    //     }
        
    //     return this.state.moviesData.map((movieData) => {
    //         const movie = movieData.movie ? movieData.movie : movieData
    //         const title = movie.title
    //         var description = movie.overview ? movie.overview : movie.description
    //         if (description === undefined) description = ""
    //         const opinion = movie.opinion ? movie.opinion : null
    //         var activeUserOpinion = null
    //         const imageUrl = movie.image_url ? movie.image_url : movie.poster_path
    //         const id = movie.movieId ? movie.movieId : movie.id
    //         const user = !fromSearch && movieData.user ? {
    //             _id: movieData.user._id,
    //             name: movieData.user.name
    //         } : null
            
    //         if (this.props.isActiveUserProfile) favorited = true
    //         else favorited = favoriteMovies.find(movie => movie.movieId === id) !== undefined

    //         if (favorited && favoriteMovies.length > 0) {
    //             const foundMovie = favoriteMovies.find(movie => movie.movieId === id)
    //             if (foundMovie) activeUserOpinion = foundMovie.opinion 
    //         }
            
    //         const movieObject = {
    //             id: id,
    //             user: user,
    //             title: title,
    //             description: description,
    //             imageUrl: imageUrl,
    //             favorited: favorited,
    //             opinion: opinion,
    //             activeUserOpinion: activeUserOpinion
    //         }
    //         return <li>
    //             <Movie 
    //                 id={id} 
    //                 user={user} 
    //                 title={title} 
    //                 description={description} 
    //                 imageUrl={imageUrl} 
    //                 favorited={favorited} 
    //                 isActiveUserProfile={this.props.isActiveUserProfile}
    //                 onClick={(favorited) => this.showModal(favorited, movieObject)} 
    //                 onRemoveMovie={(id) => this.removeMovie(id)} />
    //         </li>
    //     })
    // }

    createMovieList = () => {
        const favorited = false
       
        return this.props.movies.map(movie => (
            <li>
                <Movie
                    id={movie.id}
                    title={movie.title}
                    imageUrl={movie.imageUrl}
                    description={movie.description}
                    favorited={favorited}
                    favoritedBy={movie.favoritedBy}
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

const mapStateToProps = (state) => {
    console.log("STATE:", state)
    const movies = state.searchedMovies.searchedMovies.length > 0 ? state.searchedMovies.searchedMovies : state.recentFavMovies.recentFavMovies
    console.log("MOVIES:", movies)
    return {
        movies
    }
}

export default connect(mapStateToProps)(MoviesTable)



