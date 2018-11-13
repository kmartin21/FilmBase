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
            <div className="home-page">
                <SearchBar />
                <h6><strong>Recently favorited by others</strong></h6>
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
    
