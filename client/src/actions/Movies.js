import {
    FETCH_SEARCHED_MOVIES_BEGIN,
    FETCH_SEARCHED_MOVIES_SUCCESS,
    FETCH_SEARCHED_MOVIES_FAILURE,
    FETCH_RECENT_FAV_MOVIES_BEGIN,
    FETCH_RECENT_FAV_MOVIES_SUCCESS,
    FETCH_RECENT_FAV_MOVIES_FAILURE
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
        movies: json
    }
})

export const fetchRecentMoviesSuccess = (json) => ({
    type: FETCH_RECENT_FAV_MOVIES_SUCCESS,
    payload: {
        movies: json
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
            .then(json => fetchRecentMoviesSuccess(json))
            .catch(err => dispatch(fetchRecentFavMoviesFailure(err)))
    }
}














