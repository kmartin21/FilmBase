import React, { Component } from 'react'
import '../styles/main.css'
import downArrow from '../images/down-arrow.svg'
import TextEllipsis from 'react-text-ellipsis'

class MovieDetailsModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isEditing: false,
            activeUserOpinion: this.props.activeUserOpinion,
            collapsed: true,
            showOverflow: false, 
            showReadMoreIcon: false
        }
    }

    setIsEditing = () => {
        this.setState({ isEditing: !this.state.isEditing })
    }

    editOpinion = (id) => {
        this.setIsEditing()
        this.props.editOpinion(id, this.state.activeUserOpinion)
    }

    unfavoriteMovie = (id) => {
        this.setState({ activeUserOpinion: "" })
        this.props.unfavoriteMovie(id)
    }

    setOpinion = (e) => {
        this.setState({ activeUserOpinion: e.target.value })
    }

    setCollapsed = (collapsed) => {
        this.setState({ collapsed })
    }

    setShowOverflow = () => {
        this.setState({ collapsed: false, showOverflow: true })
    }

    setShowReadMoreIcon = () => {
        this.setState({ showReadMoreIcon: !this.state.showReadMoreIcon })
    }

    render() {
        const { id, title, imageUrl, description, favorited, favoritedBy, opinion, isActiveUserProfile, onClose, favoriteMovie, unfavoriteMovie, editOpinion } = this.props
        
        return (
            <div className='movie-details-modal__container'>
                <a href="#" className="close" onClick={onClose}/>
                <div className="movie-details__container">
                    <img className="movie-details__image" src={`https://image.tmdb.org/t/p/w500/${imageUrl}`} alt='Movie image'/>
                    <div className="movie-details__info-container">
                    <h5 className="movie-details__title">{title}</h5>
                        {!this.state.collapsed ?
                            [(this.state.showOverflow ? 
                                <p className="movie-details__description--overflow">{description}</p> :
                                <p className="movie-details__description">{description}</p>
                            )]
                            
                            :
                            <TextEllipsis 
                                lines={1} 
                                tag={'p'} 
                                ellipsisChars={'...'}
                                tagClass={'movie-details__description'}
                                onResult={(result) => { 
                                    if (result === TextEllipsis.RESULT.TRUNCATED && !this.state.showReadMoreIcon)
                                        this.setShowReadMoreIcon()
                                    else 
                                        this.setCollapsed(false)
                                    }}>
                                {description}
                            </TextEllipsis>
                        }
                    
                        {this.state.collapsed &&
                            <img className="movie-details__more-btn" src={downArrow} alt='Read more button' onClick={() => this.setShowOverflow()}/>
                        }
                    </div>

                    {(opinion !== undefined && !isActiveUserProfile) && (
                        <p>{favoritedBy}'s opinion: {opinion}</p>
                    )}
                    {favorited && (
                        <div>
                            <p>Your opinion: <input type="text" onChange={this.setOpinion} disabled={!this.state.isEditing} defaultValue={this.state.activeUserOpinion}/></p>
                            <button onClick={this.state.isEditing ? this.editOpinion.bind(this, id, this.state.activeUserOpinion) : this.setIsEditing}>{this.state.isEditing ? 'Save' : 'Edit'}</button>
                        </div>
                    )}
                    <button onClick={favorited ? this.unfavoriteMovie.bind(this, id) :  () => favoriteMovie(id, title, description, imageUrl)}>{favorited ? 'Unfavorite' : 'Favorite'}</button>
                </div>
            </div>
        )
    }
}

export default MovieDetailsModal