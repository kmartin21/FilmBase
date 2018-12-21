import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import auth0Client from '../containers/oauth/Auth'
import starEmpty from '../images/star-empty.svg'
import starFilled from '../images/star-filled.svg'
import TextEllipsis from 'react-text-ellipsis'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Movie extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        description: PropTypes.string.isRequired,
        favorited: PropTypes.bool.isRequired,
        favoritedBy: PropTypes.string,
        user_id: PropTypes.string,
        userId: PropTypes.string,
        isProfile: PropTypes.bool.isRequired,
        onClickImage: PropTypes.func.isRequired,
        favoriteMovie: PropTypes.func.isRequired,
        unfavoriteMovie: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            favorited: this.props.favorited
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.favorited !== this.props.favorited) {
            this.setState({ favorited: this.props.favorited })
        }
    }

    favoriteMovie = (id, title, description, imageUrl) => {
        if (this.props.userId) {
            this.setState({ favorited: true })
        }
        this.props.favoriteMovie(id, title, description, imageUrl)
    }

    unfavoriteMovie = (id) => {
        this.setState({ favorited: false })
        this.props.unfavoriteMovie(id)
    }

    render() {
        const {id, favoritedBy, user_id, title, description, imageUrl, isProfile, onClickImage} = this.props
        const favorited = this.state.favorited
       
        return (
            <div className="movie">
                <img className="movie__favorite-button" src={favorited ? starFilled : starEmpty} alt='Favorite button' onClick={favorited && auth0Client.isAuthenticated() ? () => this.unfavoriteMovie(id) : () => this.favoriteMovie(id, title, description, imageUrl)}/>
                <img className="movie__image" src={`https://image.tmdb.org/t/p/w185/${imageUrl}`} alt='Movie cover' onClick={() => onClickImage(id)}/>
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
    }
}

const mapStateToProps = (state) => {
    const userId = state.loggedInUserInfo.id

    return {
        userId
    }
}

export default connect(mapStateToProps)(Movie)





