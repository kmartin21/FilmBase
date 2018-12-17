import React, { Component } from 'react'
import { connect } from 'react-redux' 
import {
    fetchSearchedMovies,
    clearSearchedMovies
} from '../actions/Movies'
import '../styles/main.css'
import PropTypes from 'prop-types'

class SearchBar extends Component {
    static PropTypes = {
        fetchSearchedMovies: PropTypes.func.isRequired,
        clearSearchedMovies: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }

    handleInputChange = (e) => {

        this.setState({
            query: e.target.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.props.fetchSearchedMovies(this.state.query)
                }
            } else {
                this.props.clearSearchedMovies()
            }
        })
    }

    render() {
        return (
            <form>
                {!this.props.userIsLoggedIn ?
                    <input
                        placeholder="Search for any movie"
                        onChange={this.handleInputChange}
                        className="search__input"
                    />
                    :
                    <input
                        placeholder="Search for any movie"
                        onChange={this.handleInputChange}
                        className="search__input--logged-in-user"
                    />
                }
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        fetchSearchedMovies: (query) => dispatch(fetchSearchedMovies(query)),
        clearSearchedMovies: () => dispatch(clearSearchedMovies())
    }
)

export default connect(null, mapDispatchToProps)(SearchBar)