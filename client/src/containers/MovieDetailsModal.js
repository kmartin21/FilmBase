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
        const { id, title, imageUrl, favorited, favoritedBy, isActiveUserProfile, onClose, favoriteMovie, unfavoriteMovie, editOpinion } = this.props
        const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed sed risus pretium quam vulputate dignissim suspendisse in. Vitae justo eget magna fermentum iaculis eu non diam phasellus. Justo nec ultrices dui sapien eget mi. Viverra justo nec ultrices dui sapien eget mi. Et malesuada fames ac turpis. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Morbi non arcu risus quis varius quam. Nulla malesuada pellentesque elit eget gravida cum. Tristique senectus et netus et malesuada fames. Enim neque volutpat ac tincidunt vitae semper quis. Placerat in egestas erat imperdiet sed euismod. Sit amet nisl purus in. Leo duis ut diam quam nulla porttitor massa id. Ipsum dolor sit amet consectetur adipiscing elit duis tristique. Leo urna molestie at elementum eu facilisis sed odio. Sed viverra tellus in hac. Pretium vulputate sapien nec sagittis. Facilisis sed odio morbi quis. Integer eget aliquet nibh praesent. Consectetur lorem donec massa sapien. Fames ac turpis egestas maecenas pharetra convallis posuere. Duis ut diam quam nulla porttitor massa id. Tempus egestas sed sed risus pretium quam vulputate dignissim. Tristique risus nec feugiat in fermentum posuere urna nec. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. At tellus at urna condimentum. In hac habitasse platea dictumst quisque sagittis purus. Semper viverra nam libero justo. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Aliquam vestibulum morbi blandit cursus risus at. Facilisi etiam dignissim diam quis enim. Egestas dui id ornare arcu odio ut sem nulla pharetra. Proin sed libero enim sed faucibus turpis in. Id aliquet risus feugiat in ante metus dictum. Elementum tempus egestas sed sed risus pretium. Ac tincidunt vitae semper quis lectus nulla. Convallis convallis tellus id interdum velit laoreet id. Nibh nisl condimentum id venenatis a. Venenatis cras sed felis eget velit aliquet sagittis."
        const opinion = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed sed risus pretium quam vulputate dignissim suspendisse in. Vitae justo eget magna fermentum iaculis eu non diam phasellus. Justo nec ultrices dui sapien eget mi. Viverra justo nec ultrices dui sapien eget mi. Et malesuada fames ac turpis. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Morbi non arcu risus quis varius quam. Nulla malesuada pellentesque elit eget gravida cum. Tristique senectus et netus et malesuada fames. Enim neque volutpat ac tincidunt vitae semper quis. Placerat in egestas erat imperdiet sed euismod. Sit amet nisl purus in. Leo duis ut diam quam nulla porttitor massa id. Ipsum dolor sit amet consectetur adipiscing elit duis tristique. Leo urna molestie at elementum eu facilisis sed odio. Sed viverra tellus in hac. Pretium vulputate sapien nec sagittis. Facilisis sed odio morbi quis. Integer eget aliquet nibh praesent. Consectetur lorem donec massa sapien. Fames ac turpis egestas maecenas pharetra convallis posuere. Duis ut diam quam nulla porttitor massa id. Tempus egestas sed sed risus pretium quam vulputate dignissim. Tristique risus nec feugiat in fermentum posuere urna nec. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. At tellus at urna condimentum. In hac habitasse platea dictumst quisque sagittis purus. Semper viverra nam libero justo. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Aliquam vestibulum morbi blandit cursus risus at. Facilisi etiam dignissim diam quis enim. Egestas dui id ornare arcu odio ut sem nulla pharetra. Proin sed libero enim sed faucibus turpis in. Id aliquet risus feugiat in ante metus dictum. Elementum tempus egestas sed sed risus pretium. Ac tincidunt vitae semper quis lectus nulla. Convallis convallis tellus id interdum velit laoreet id. Nibh nisl condimentum id venenatis a. Venenatis cras sed felis eget velit aliquet sagittis."
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
                </div>
            </div>
        )
    }
}

export default MovieDetailsModal





