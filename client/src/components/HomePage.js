import React, {Component} from 'react'
import SearchBar from './SearchBar'
import MoviesTable from '../containers/MoviesTable'
import fetch from 'cross-fetch'
import auth0Client from '../oauth/Auth'

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fromSearch: false,
            searchData: [], 
            recentFavorites: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:7001/recent-favorites`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => this.setState({ fromSearch: false, recentFavorites: json.recentFavorites }))
        .catch(error => alert(`ERROR: ${error}`))
    }

    searchResults = (searchData) => {
        this.setState({ fromSearch: searchData.length, searchData })
    }

    render() {
        var moviesData = this.state.searchData.length ? this.state.searchData : this.state.recentFavorites

        if (!this.state.fromSearch && auth0Client.isAuthenticated()) {
            moviesData = this.state.recentFavorites.filter(movie => movie.user._id !== localStorage.getItem('userId'))
        }
        
        return (
            <div>
                <SearchBar searchResults={this.searchResults}/>
                <h6><strong>Recently favorited by others</strong></h6>
                <MoviesTable removeable={false} fromSearch={this.state.fromSearch} moviesData={moviesData}/>
            </div>
        )
    }
}

export default HomePage
    
