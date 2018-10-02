import React, {Component} from 'react'
import SearchBar from './SearchBar'
import MoviesTable from '../containers/MoviesTable'
import fetch from 'cross-fetch'

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            moviesData: []
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
        .then(recentFavorites => console.log("RECENT FAVS:", recentFavorites))
        .catch(error => alert(`ERROR: ${error}`))
    }

    searchResults = (moviesData) => {
        this.setState({ moviesData })
    }

    render() {
        return (
            <div>
                <SearchBar searchResults={this.searchResults}/>
                <h6><strong>Recently favorited by others</strong></h6>
                <MoviesTable moviesData={this.state.moviesData}/>
            </div>
        )
    }
}

export default HomePage
    
