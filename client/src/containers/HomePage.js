import React, {Component} from 'react'
import SearchBar from './SearchBar'
import MoviesTable from './MoviesTable'
import { connect } from 'react-redux'
import { fetchRecentFavMovies } from '../actions/Movies';

class HomePage extends Component {

    componentDidMount() {
        this.props.fetchRecentFavMovies()
    }

    render() {
        return (
            <div>
                <SearchBar />
                {!this.props.isSearching && 
                    <h4 className="recents-page__header">Recently favorited by others</h4>
                }
                <MoviesTable isProfile={false} isActiveProfile={false} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        fetchRecentFavMovies: () => dispatch(fetchRecentFavMovies())
    }
)

const mapStateToProps = (state) => (
    {
        isSearching: state.searchedMovies.movies.length > 0 
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
    
