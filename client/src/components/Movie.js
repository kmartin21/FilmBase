import React from 'react'
import {Link} from 'react-router-dom'
import auth0Client from '../containers/oauth/Auth'
import starEmpty from '../images/star-empty.svg'
import starFilled from '../images/star-filled.svg'
import TextEllipsis from 'react-text-ellipsis'

const Movie = ({ id, favorited, favoritedBy, user_id, title, description, imageUrl, isProfile, favoriteMovie, unfavoriteMovie, onClickImage }) => (
    <div className="movie">
        <img className="movie__favorite-button" src={favorited ? starFilled : starEmpty} alt='Favorite button' onClick={favorited && auth0Client.isAuthenticated() ? () => unfavoriteMovie(id) : () => favoriteMovie(id, title, description, imageUrl)}/>
        <img className="movie__image" src={`https://image.tmdb.org/t/p/w185/${imageUrl}`} alt='Movie image' onClick={() => onClickImage(id)}/>
        <p className="movie__title">{title}</p>
        {favoritedBy === undefined &&
            <div className="movie__description">
                <TextEllipsis 
                    lines={4} 
                    tag={'p'} 
                    ellipsisChars={'...'}>
                    {description}
                </TextEllipsis>
            </div>
        }
        <div>
            {(favoritedBy !== undefined && !isProfile) &&
                <p className="movie__favorited-by">Favorited by <Link className="movie__description--link" to={`/user/${user_id}/profile`}>{favoritedBy}</Link></p>
            }
        </div> 
    </div>
)

export default Movie





