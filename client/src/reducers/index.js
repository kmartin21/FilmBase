import { combineReducers } from 'redux'
import {
    searchedMovies,
    recentFavMovies
} from '../reducers/Movies'

export default combineReducers({
    searchedMovies,
    recentFavMovies
})