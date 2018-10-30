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

    unfavoriteMovie = (e, id) => {
        const {onRemoveMovie, onClose} = this.props

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
            if (this.props.isActiveUserProfile) {
                onRemoveMovie(id)
                onClose(e)
            }
            
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
        const { id, title, imageUrl, description, favorited, favoritedBy, opinion, isProfile, isActiveUserProfile, onClose, onRemoveMovie } = this.props
        
        return (
            <div className='movie-details-modal'>
                <a href="#" className="close" onClick={onClose}/>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w45/${imageUrl}`} alt='Movie image'/>
                    <h5>{title}</h5>
                    <p>{description}</p>
                    {(opinion && !isProfile) && (
                        <p>{favoritedBy}'s opinion: {opinion}</p>
                    )}
                    {favorited && (
                        <div>
                            <p>Your opinion: <input type="text" onChange={this.setOpinion} disabled={!this.state.isEditing} defaultValue={movie.activeUserOpinion}/></p>
                            <button onClick={this.state.isEditing ? this.editOpinion.bind(this, id, opinion) : this.setIsEditing}>{this.state.isEditing ? 'Save' : 'Edit'}</button>
                        </div>
                    )}
                    <button onClick={this.state.favorited ? (e) => this.unfavoriteMovie(e, id) : this.favoriteMovie.bind(this, id, title, description, imageUrl)}>{this.state.favorited ? 'Unfavorite' : 'Favorite'}</button>
                </div>
            </div>
        )
    }
}

export default MovieDetailsModal