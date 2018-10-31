import {
    FETCH_SEARCHED_MOVIES_BEGIN,
    FETCH_SEARCHED_MOVIES_SUCCESS,
    FETCH_SEARCHED_MOVIES_FAILURE,
    FETCH_RECENT_FAV_MOVIES_BEGIN,
    FETCH_RECENT_FAV_MOVIES_SUCCESS,
    FETCH_RECENT_FAV_MOVIES_FAILURE,
    CLEAR_SEARCHED_MOVIES
} from './ActionTypes'
import * as moviesApi from '../api/MoviesApi'

export const fetchSearchedMoviesBegin = () => ({
    type: FETCH_SEARCHED_MOVIES_BEGIN
})

export const fetchRecentFavMoviesBegin = () => ({
    type: FETCH_RECENT_FAV_MOVIES_BEGIN
})

export const fetchSearchedMoviesSuccess = (json) => ({
    type: FETCH_SEARCHED_MOVIES_SUCCESS,
    payload: {
        movies: json.results
    }
})

export const fetchRecentMoviesSuccess = (json) => ({
    type: FETCH_RECENT_FAV_MOVIES_SUCCESS,
    payload: {
        movies: json.recentFavorites
    }
})

export const fetchSearchedMoviesFailure = (err) => ({
    type: FETCH_SEARCHED_MOVIES_FAILURE,
    payload: {
        err
    }
})

export const fetchRecentFavMoviesFailure = (err) => ({
    type: FETCH_RECENT_FAV_MOVIES_FAILURE,
    payload: {
        err
    }
})

export const clearSearchedMovies = () => ({
    type: CLEAR_SEARCHED_MOVIES
})

export const fetchSearchedMovies = (query) => {
    return (dispatch) => {
        dispatch(fetchSearchedMoviesBegin())
        
        return moviesApi.searchMovies(query)
            .then(json => dispatch(fetchSearchedMoviesSuccess(json)))
            .catch(err => dispatch(fetchSearchedMoviesFailure(err)))
    }
}

export const fetchRecentFavMovies = () => {
    return (dispatch) => {
        dispatch(fetchRecentFavMoviesBegin())
        
        return moviesApi.getRecentFavMovies()
            .then(json => dispatch(fetchRecentMoviesSuccess(json)))
            .catch(err => dispatch(fetchRecentFavMoviesFailure(err)))
    }
}














