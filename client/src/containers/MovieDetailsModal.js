import React, { Component } from 'react'
import '../styles/main.css'
import downArrow from '../images/down-arrow.svg'
import LinesEllipsis from 'react-lines-ellipsis'

class MovieDetailsModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isEditing: false,
            activeUserOpinion: this.props.activeUserOpinion,
            descriptionIsCollapsed: true,
            opinionIsCollapsed: true,
            descriptionShowOverflow: false,
            opinionShowOverflow: false,
            showReadMoreDescriptionIcon: false,
            showReadMoreOpinionIcon: false,
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

    setDescriptionShowOverflow = () => {
        this.setState({ descriptionIsCollapsed: false, descriptionShowOverflow: true, showReadMoreDescriptionIcon: false })
    }

    setOpinionShowOverflow = () => {
        this.setState({ opinionIsCollapsed: false, opinionShowOverflow: true, showReadMoreOpinionIcon: false })
    }

    setShowReadMoreDescriptionIcon = () => {
        this.setState({ showReadMoreDescriptionIcon: !this.state.showReadMoreDescriptionIcon })
    }

    setShowReadMoreOpinionIcon = () => {
        this.setState({ showReadMoreOpinionIcon: !this.state.showReadMoreOpinionIcon })
    }

    handleDescriptionClamped = (rleState) => {
        const {clamped} = rleState

        if (clamped && !this.state.showReadMoreDescriptionIcon) {
            this.setShowReadMoreDescriptionIcon()
        }
    }

    handleOpinionClamped = (rleState) => {
        const {clamped} = rleState

        if (clamped && !this.state.showReadMoreOpinionIcon) {
            this.setShowReadMoreOpinionIcon()
        }
    }

    render() {
        const { id, title, imageUrl, description, favorited, favoritedBy, isActiveUserProfile, onClose, favoriteMovie, unfavoriteMovie, editOpinion } = this.props
        const opinion = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        return (
            <div className='movie-details-modal__container'>
                <a href="#" className="close" onClick={onClose}/>
                <div>
                    <img className="movie-details__image" src={`https://image.tmdb.org/t/p/w500/${imageUrl}`} alt='Movie image'/>
                    <div className="movie-details__info-container">
                    <h5 className="movie-details__title">{title}</h5>
                        {!this.state.descriptionIsCollapsed ?
                            [(this.state.descriptionShowOverflow ? 
                                <p className="movie-details__description--overflow">{description}</p> :
                                <p className="movie-details__description">{description}</p>
                            )]
                            : 
                            <div className="movie-details__description">
                                <LinesEllipsis
                                    text={description}
                                    maxLine='1'
                                    ellipsis='...'
                                    trimRight
                                    onReflow={this.handleDescriptionClamped}
                                    basedOn='letters'
                                />
                            </div>
                        }
                         
                        {this.state.showReadMoreDescriptionIcon &&
                            <img className="movie-details__more-btn" src={downArrow} alt='Read more button' onClick={() => this.setDescriptionShowOverflow()}/>
                        }

                        {(opinion !== undefined && !isActiveUserProfile) && 
                            [(!this.state.opinionIsCollapsed) ?
                                [(this.state.opinionShowOverflow ? 
                                    <div>
                                        <h5 className="movie-details__opinion-header">{favoritedBy}'s opinion</h5>
                                        <p className="movie-details__opinion--overflow">{opinion}</p>
                                    </div>
                                     :
                                    <div> 
                                        <h5 className="movie-details__opinion-header">{favoritedBy}'s opinion</h5>
                                        <p className="movie-details__opinion">{opinion}</p>
                                    </div>
                                )]
                                : 
                                <div>
                                    <h5 className="movie-details__opinion-header">{favoritedBy}'s opinion</h5>
                                    <div className="movie-details__opinion">
                                        <LinesEllipsis
                                            text={opinion}
                                            maxLine='1'
                                            ellipsis='...'
                                            trimRight
                                            onReflow={this.handleOpinionClamped}
                                            basedOn='letters'
                                        />
                                    </div>
                                </div>
                            ]
                        }

                        {this.state.showReadMoreOpinionIcon &&
                            <img className="movie-details__more-btn" src={downArrow} alt='Read more button' onClick={() => this.setOpinionShowOverflow()}/>
                        }
                    </div>

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





