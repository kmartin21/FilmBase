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
                <h4 className="recents-page__header">Recently favorited by others</h4>
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

export default connect(null, mapDispatchToProps)(HomePage)
    
