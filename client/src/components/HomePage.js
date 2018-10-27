import React, {Component} from 'react'
import SearchBar from './SearchBar'
import MoviesTable from '../containers/MoviesTable'
import { connect } from 'react-redux'
import auth0Client from '../oauth/Auth'
import { fetchRecentFavMovies } from '../actions/Movies';

class HomePage extends Component {

    componentDidMount() {
        this.props.fetchRecentFavMovies()
    }

    render() {
        // var moviesData = this.state.searchData.length ? this.state.searchData : this.state.recentFavorites

        // if (!this.state.fromSearch && auth0Client.isAuthenticated()) {
        //     moviesData = this.state.recentFavorites.filter(movie => movie.user._id !== localStorage.getItem('userId'))
        // }
        
        return (
            <div>
                <SearchBar />
                <h6><strong>Recently favorited by others</strong></h6>
                <MoviesTable isActiveUserProfile={false} />
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
    
