import React from 'react'
import {Link} from 'react-router-dom'
import auth0Client from '../containers/oauth/Auth'

const Movie = ({ id, favorited, favoritedBy, user_id, title, description, imageUrl, isProfile, favoriteMovie, unfavoriteMovie, onClickImage }) => (
    <div className="movie">
        <img className="movie__image" src={`https://image.tmdb.org/t/p/w185/${imageUrl}`} alt='Movie image' onClick={() => onClickImage(id)}/>
        <h5 className="movie__title">{title}</h5>
        {/* <p>{description}</p> */}
        <div>
            {(favoritedBy !== undefined && !isProfile) &&
                <p>Favorited by <Link to={`/user/${user_id}/profile`}>{favoritedBy}</Link></p>
            }
            <button onClick={favorited && auth0Client.isAuthenticated() ? () => unfavoriteMovie(id) : () => favoriteMovie(id, title, description, imageUrl)}>{favorited ? 'Unfavorite' : 'Favorite'}</button>
        </div> 
    </div>
)

export default Movie





