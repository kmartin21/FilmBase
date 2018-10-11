import React, { Component } from 'react'
import fetch from 'cross-fetch'
import {Link, withRouter} from 'react-router-dom'
import auth0Client from '../oauth/Auth';

class Movie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            favorited: false
        }
        this.favoriteMovie = this.favoriteMovie.bind(this)
        this.unfavoriteMovie = this.unfavoriteMovie.bind(this)
        this.createOpinion = this.createOpinion.bind(this)
    }

    componentWillMount() {
        const storedFavMovies = localStorage.getItem("favoriteMovies")
        if (storedFavMovies === null) {
            const favoriteMovies = JSON.parse(storedFavMovies)
            const id = this.props.id
            if (favoriteMovies && id) this.setState({favorited: favoriteMovies.includes(parseInt(id))})
        }
    }

    favoriteMovie(id, title, description, imageUrl) {
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
            debugger
            localStorage.setItem("favoriteMovies", JSON.stringify(json.favoriteMovies))
            this.setState({favorited: localStorage.getItem("favoriteMovies").includes(parseInt(this.props.id))})
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
            debugger
            localStorage.setItem("favoriteMovies", JSON.stringify(json.favoriteMovies))
            this.setState({favorited: localStorage.getItem("favoriteMovies").includes(parseInt(this.props.id))})
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
        const {isRecent, id, user, title, description, imageUrl} = this.props
        
        return (
            <div>
                <img src={`https://image.tmdb.org/t/p/w45/${imageUrl}`} alt='Movie image' />
                <h5>{title}</h5>
                <p>{description}</p>
                {isRecent 
                    ? <p>Favorited by <Link to={`/user/${user._id}`}>{user.name}</Link></p>
                    : <div>
                        <button onClick={this.state.favorited ? this.unfavoriteMovie.bind(this, id) : this.favoriteMovie.bind(this, id, title, description, imageUrl)}>{this.state.favorited ? 'Unfavorite' : 'Favorite'}</button>
                        {this.state.favorited &&
                            <button onClick={this.createOpinion.bind(this, id, "Awesome movie!!")}>Write opinion</button>
                        }
                    </div> 
                }
            </div>
        )
    }
}

export default Movie




