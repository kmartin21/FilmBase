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
        const { id, title, imageUrl, favorited, favoritedBy, description, opinion, isActiveUserProfile, onClose} = this.props
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

                        {(favorited) && 
                            <div>
                                <h5 className="movie-details__opinion-header">Your opinion</h5>
                                <div className="movie-details__opinion">
                                    <textarea className="movie-details__opinion--textarea" onChange={this.setOpinion} disabled={!this.state.isEditing} defaultValue={this.state.activeUserOpinion} placeholder="Give your opinion..."/>
                                    <button className="movie-details__opinion-btn" onClick={this.state.isEditing ? this.editOpinion.bind(this, id, this.state.activeUserOpinion) : this.setIsEditing}>{this.state.isEditing ? 'Save' : 'Edit'}</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieDetailsModal





