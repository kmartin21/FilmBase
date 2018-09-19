import React, {Component} from 'react'
import SearchBar from './SearchBar'
import MoviesTable from '../containers/MoviesTable'

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            moviesData: []
        }
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
    
