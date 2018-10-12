import React, { Component } from 'react'
import fetch from 'cross-fetch'
import {Link} from 'react-router-dom'
import auth0Client from '../oauth/Auth';

class Movie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            favorited: null
        }
        this.favoriteMovie = this.favoriteMovie.bind(this)
        this.unfavoriteMovie = this.unfavoriteMovie.bind(this)
        this.createOpinion = this.createOpinion.bind(this)
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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

    createOpinion(id, opinion) {
        const userId = localStorage.getItem('userId')

        fetch(`http://localhost:7001/user/${userId}/fav-movie/${id}/opinion`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                opinion: opinion
            })
        })
        .catch(error => {
            alert(`ERROR: ${error}`)
        })
    } 

    render() {
        const {id, user, title, description, imageUrl} = this.props
        var {favorited} = this.props
        favorited = this.state.favorited ? this.state.favorited : favorited
        return (
            <div>
                <img src={`https://image.tmdb.org/t/p/w45/${imageUrl}`} alt='Movie image' />
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





