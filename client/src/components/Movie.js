import React, { Component } from 'react'
import fetch from 'cross-fetch'

class Movie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            favorited: localStorage.getItem("favoriteMovies").includes(parseInt(props.id)) 
        }
        this.favoriteMovie = this.favoriteMovie.bind(this)
        this.unfavoriteMovie = this.unfavoriteMovie.bind(this)
        this.createOpinion = this.createOpinion.bind(this)
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
            localStorage.setItem("favoriteMovies", json.favoriteMovies)
            this.setState({favorited: localStorage.getItem("favoriteMovies").includes(parseInt(this.props.id))})
        })
        .catch(error => alert(`ERROR: ${error}`))
    }

    unfavoriteMovie(id) {
        const userId = localStorage.getItem('userId')
        console.log("UNFAV MOVIE")
        fetch(`http://localhost:7001/user/${userId}/fav-movie/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            localStorage.setItem("favoriteMovies", json.favoriteMovies)
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
        const {isRecents, id, title, description, imageUrl} = this.props
        
        return (
            <div>
                <img src={`https://image.tmdb.org/t/p/w45/${imageUrl}`} alt='Movie image' />
                <h5>{title}</h5>
                <p>{description}</p>
                <p>Favorited by <a href="">kmartin5</a></p>
                {isRecents ?
                    <button onClick={this.state.favorited ? this.unfavoriteMovie.bind(this, id) : this.favoriteMovie.bind(this, id, title, description, imageUrl)}>{this.state.favorited ? 'Unfavorite' : 'Favorite'}</button>
                    {this.state.favorited ?
                    <button onClick={this.createOpinion.bind(this, id, "Awesome movie!!")}>Write opinion</button>
                    : null}
                    : null
                }
            </div>
        )
    }
}

export default Movie