import React, { Component } from 'react'
import fetch from 'cross-fetch'

class ProfilePage extends Component {

    constructor() {
        this.state = {
            favoriteMovies: []
        }
    }

    componentDidMount() {
        const {params} = this.props.match
        fetch(`http://localhost:7001/user/${params.id}/profile`)
        .then(response => response.json())
        .then(json => {
            this.setState({ favoriteMovies: json.favoriteMovies })
        })
    }

    render() {

    }

}

export default ProfilePage