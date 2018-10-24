import React, { Component } from 'react'
import fetch from 'cross-fetch'
import {Link} from 'react-router-dom'
import auth0Client from '../oauth/Auth';

class Movie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            favorited: this.props.favorited
        }
        this.favoriteMovie = this.favoriteMovie.bind(this)
        this.unfavoriteMovie = this.unfavoriteMovie.bind(this)
        this.createOpinion = this.createOpinion.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.favorited !== this.props.favorited) {
            this.setState({ favorited: this.props.favorited })
        }
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
        const {onRemoveMovie} = this.props
        
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
            if (this.props.removeable) onRemoveMovie(id)
            else this.setState({favorited: false})
        })
        .catch(error => {
            alert(`ERROR: ${error}`)
        })
    }

    createOpinion(id, opinion) {
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

    render() {
        const {id, user, title, description, imageUrl, onClick} = this.props
        const favorited = this.state.favorited
        return (
            <div>
                <img src={`https://image.tmdb.org/t/p/w45/${imageUrl}`} alt='Movie image' onClick={onClick}/>
                <h5>{title}</h5>
                <p>{description}</p>
                <div>
                    {user &&
                        <p>Favorited by <Link to={`/user/${user._id}/profile`}>{user.name}</Link></p>
                    }
                    <button onClick={favorited && auth0Client.isAuthenticated() ? this.unfavoriteMovie.bind(this, id) : this.favoriteMovie.bind(this, id, title, description, imageUrl)}>{favorited || this.state.favorited && auth0Client.isAuthenticated() ? 'Unfavorite' : 'Favorite'}</button>
                    {favorited && auth0Client.isAuthenticated() &&
                        <button onClick={this.createOpinion.bind(this, id, "Awesome movie!!")}>Write opinion</button>
                    }
                </div> 
            </div>
        )
    }
}

export default Movie





