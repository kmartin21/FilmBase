import React, { Component } from 'react'
import '../styles/main.css'
import auth0Client from '../oauth/Auth'

class MovieDetailsModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isEditing: false,
            favorited: this.props.movie.favorited,
            opinion: this.props.movie.activeUserOpinion
        }
        this.favoriteMovie = this.favoriteMovie.bind(this)
        this.unfavoriteMovie = this.unfavoriteMovie.bind(this)
        this.editOpinion = this.editOpinion.bind(this)
    }

    setIsEditing = () => {
        this.setState({ isEditing: !this.state.isEditing })
    }

    favoriteMovie(id, title, description, imageUrl) {
        if (!auth0Client.isAuthenticated()) {
            alert("Sign in to add movies to your favorites")
            return
        }
        const userId = localStorage.getItem('userId')

        fetch(`http://localhost:7001/user/${userId}/fav-movie/${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            },
            body: JSON.stringify({
                title: title,
                description: description,
                imageUrl: imageUrl
            })
        })
        .then(response => response.json())
        .then(json => {
            localStorage.setItem("favoriteMovies", JSON.stringify(json.favoriteMovies))
            this.setState({favorited: true})
        })
        .catch(error => alert(`ERROR: ${error}`))
    }

    unfavoriteMovie(id) {
        const userId = localStorage.getItem('userId')
        fetch(`http://localhost:7001/user/${userId}/fav-movie/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            }
        })
        .then(response => response.json())
        .then(json => {
            localStorage.setItem("favoriteMovies", JSON.stringify(json.favoriteMovies))
            this.setState({favorited: false})
        })
        .catch(error => {
            alert(`ERROR: ${error}`)
        })
    }

    editOpinion(id, opinion) {
        this.setIsEditing()

        const userId = localStorage.getItem('userId')

        fetch(`http://localhost:7001/user/${userId}/fav-movie/${id}/opinion`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            },
            body: JSON.stringify({
                opinion: opinion
            })
        })
        .then(response => response.json())
        .then(json => {
            localStorage.setItem("favoriteMovies", JSON.stringify(json.favoriteMovies))
        })
        .catch(error => {
            alert(`ERROR: ${error}`)
        })
    } 

    setOpinion = (e) => {
        this.setState({opinion: e.target.value})
    }

    render() {
        const { onClose, movie } = this.props
        
        return (
            <div className='movie-details-modal'>
                <a href="#" className="close" onClick={onClose}/>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w45/${movie.imageUrl}`} alt='Movie image'/>
                    <h5>{movie.title}</h5>
                    <p>{movie.description}</p>
                    {movie.opinion && (
                        <p>{movie.user.name}'s review: {movie.opinion}</p>
                    )}
                    {this.state.favorited && (
                        <div>
                            <p>Your review: <input type="text" onChange={this.setOpinion} disabled={!this.state.isEditing} defaultValue={movie.activeUserOpinion}/></p>
                            <button onClick={this.state.isEditing ? this.editOpinion.bind(this, movie.id, this.state.opinion) : this.setIsEditing}>{this.state.isEditing ? 'Save' : 'Edit'}</button>
                        </div>
                    )}
                    <button onClick={this.state.favorited ? this.unfavoriteMovie.bind(this, movie.id) : this.favoriteMovie.bind(this, movie.id, movie.title, movie.description, movie.image_url)}>{this.state.favorited ? 'Unfavorite' : 'Favorite'}</button>
                </div>
            </div>
        )
    }
}

export default MovieDetailsModal