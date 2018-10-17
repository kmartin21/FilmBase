import React, { Component } from 'react'
import '../styles/main.css'

class MovieDetailsModal extends Component {


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
                    {movie.userOpinion && (
                        <p>Your review: {movie.userOpinion}</p>
                    )}
                </div>
            </div>
        )
    }
}

export default MovieDetailsModal