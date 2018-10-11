import React, {Component} from 'react'
import fetch from 'cross-fetch'

const API_KEY = '0eef4fac41107b63d486049ebbbe4ca1'
const API_URL = 'https://api.themoviedb.org/3/search/movie'

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: '',
            results: []
        }
    }

    getSearchResults = (query) => {
        fetch(`${API_URL}?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
        .then(response => response.json())
        .then(json => this.props.searchResults(json.results))
        .catch(error => console.log("ERR: ", error))
    }

    handleInputChange = (e) => {
        this.setState({
            query: e.target.value
        }, () => {
            if(this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getSearchResults(this.state.query)
                }
            } else {
                this.props.searchResults([])
            }
        })
    }

    render() {
        return (
            <form>
                <input
                    placeholder="Search for..."
                    onChange={this.handleInputChange}
                />
            </form>
        )
    }
}

export default SearchBar