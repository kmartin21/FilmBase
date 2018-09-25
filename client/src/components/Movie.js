import React, { Component } from 'react'
import fetch from 'cross-fetch'
import auth0Client from '../oauth/Auth';

class Movie extends Component {
    constructor(props) {
        super(props)

        this.favoriteMovie = this.favoriteMovie.bind(this)
    }

    favoriteMovie(id) {
        const userId = localStorage.getItem('userId')
        fetch(`http://localhost:7001/user/${userId}/fav-movie/${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: `${auth0Client.getProfile().nickname}`})
        })
    }

    render() {
        const {id, title, description, imageUrl} = this.props

        return (
            <div>
                <img src={`https://image.tmdb.org/t/p/w45/${imageUrl}`} alt='Movie image' />
                <h5>{title}</h5>
                <p>{description}</p>
                <p>Favorited by <a href="">kmartin5</a></p>
                <button onClick={this.favoriteMovie.bind(this, id)}>Favorite</button>
            </div>
        )
    }
}

export default Movie