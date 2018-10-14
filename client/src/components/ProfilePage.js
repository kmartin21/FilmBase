import React, { Component } from 'react'
import fetch from 'cross-fetch'
import MoviesTable from '../containers/MoviesTable' 
import {withRouter} from 'react-router-dom';
import auth0Client from '../oauth/Auth'

class ProfilePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            favoriteMovies: []
        }
    }

    componentDidMount() {
        const {params} = this.props.match
        
        fetch(`http://localhost:7001/user/${params.id}/profile`)
        .then(response => response.json())
        .then(json => {
            this.setState({ name: json.name, favoriteMovies: json.favoriteMovies })
        })
    }

    render() {
        return (
            <div>
                <h3>{this.state.name}</h3>
                <MoviesTable fromSearch={false} moviesData={this.state.favoriteMovies}/>
            </div>
        )    
    }
}

export default withRouter(ProfilePage)