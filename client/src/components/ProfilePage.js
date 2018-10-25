import React, { Component } from 'react'
import fetch from 'cross-fetch'
import MoviesTable from '../containers/MoviesTable' 
import {withRouter} from 'react-router-dom'

class ProfilePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            favoriteMovies: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchProfile()
        }
    }

    componentDidMount() {
        this.fetchProfile()
    }

    fetchProfile = () => {
        const {params} = this.props.match
        
        fetch(`http://localhost:7001/user/${params.id}/profile`)
        .then(response => response.json())
        .then(json => {
            this.setState({ user: json.user, favoriteMovies: json.favoriteMovies })
        })
    }

    render() {
        var isActiveUserProfile = false
        if (localStorage.getItem("userId") !== null && localStorage.getItem("userId") === this.props.match.params.id) {
            isActiveUserProfile = true
        }

        const moviesData = this.state.favoriteMovies.map(favoriteMovie => {
            return {
                user: this.state.user,
                movie: favoriteMovie.movie
            }
        })

        return (
            <div>
                <h3>{this.state.user.name}</h3>
                <MoviesTable isActiveUserProfile={isActiveUserProfile} fromSearch={false} user={this.state.user} moviesData={moviesData}/>
            </div>
        )    
    }
}

export default withRouter(ProfilePage)