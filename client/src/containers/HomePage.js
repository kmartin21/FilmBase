import React, {Component} from 'react'
import SearchBar from './SearchBar'
import MoviesTable from './MoviesTable'
import { connect } from 'react-redux'
import { fetchRecentFavMovies } from '../actions/Movies';
import auth0Client from '../containers/oauth/Auth'

class HomePage extends Component {

    componentDidMount() {
        this.props.fetchRecentFavMovies()
    }

    render() {
        return (
            <div className="home-page__container">
                {!this.props.userId &&
                    <div>
                        <h2 className="site-info__header">Discover new films. Show your favorites. <br/> Let your opinion be heard on any movie.</h2>
                        <p className="site-info__description">Sign in to see your collection of favorite movies, leave an opinion, <br/>see other opinions and discover movies you haven't seen yet.</p>
                        <button className="site-info__login-btn" onClick={auth0Client.signIn}>Sign In With Google</button>
                    </div>
                }
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
        userId: state.loggedInUserInfo.id,
        isSearching: state.searchedMovies.movies.length > 0 
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
    
