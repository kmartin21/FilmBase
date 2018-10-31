import React, { Component } from 'react'
import '../styles/main.css'

class MovieDetailsModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isEditing: false,
            activeUserOpinion: this.props.activeUserOpinion
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
        this.setState({activeUserOpinion: e.target.value})
    }

    render() {
        const { id, title, imageUrl, description, favorited, favoritedBy, opinion, isActiveUserProfile, onClose, favoriteMovie, unfavoriteMovie, editOpinion } = this.props
        
        return (
            <div className='movie-details-modal'>
                <a href="#" className="close" onClick={onClose}/>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w45/${imageUrl}`} alt='Movie image'/>
                    <h5>{title}</h5>
                    <p>{description}</p>
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