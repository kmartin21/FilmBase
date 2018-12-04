import React from 'react'
import { Link } from 'react-router-dom'
import auth0Client from '../containers/oauth/Auth'
import starEmpty from '../images/star-empty.svg'
import starFilled from '../images/star-filled.svg'
import TextEllipsis from 'react-text-ellipsis'

const Movie = ({ id, favorited, favoritedBy, user_id, title, description, imageUrl, isProfile, favoriteMovie, unfavoriteMovie, onClickImage }) => (
    <div className="movie">
        <img className="movie__favorite-button" src={favorited ? starFilled : starEmpty} alt='Favorite button' onClick={favorited && auth0Client.isAuthenticated() ? () => unfavoriteMovie(id) : () => favoriteMovie(id, title, description, imageUrl)}/>
        <img className="movie__image" src={`https://image.tmdb.org/t/p/w185/${imageUrl}`} alt='Movie' onClick={() => onClickImage(id)}/>
        <div className="movie__title-container">
            <TextEllipsis 
                lines={2} 
                tag={'p'} 
                ellipsisChars={'...'}
                tagClass={'movie__title'}>
                {title}
            </TextEllipsis>
        </div>
        {favoritedBy === undefined &&
            <div className="movie__description-container">
                <TextEllipsis 
                    lines={3} 
                    tag={'p'} 
                    ellipsisChars={'...'}
                    tagClass={'movie__description'}>
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





