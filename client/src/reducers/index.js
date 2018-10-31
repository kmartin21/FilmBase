import { combineReducers } from 'redux'
import {
    searchedMovies,
    recentFavMovies
} from '../reducers/Movies'
import { profile } from '../reducers/Profile'
import { loggedInUserInfo } from '../reducers/User'

export default combineReducers({
    searchedMovies,
    recentFavMovies,
    profile,
    loggedInUserInfo
})