import {
    FAVORITE_MOVIE_SUCCESS,
    FAVORITE_MOVIE_FAILURE,
    UNFAVORITE_MOVIE_SUCCESS,
    UNFAVORITE_MOVIE_FAILURE,
    EDIT_OPINION_SUCCESS,
    EDIT_OPINION_FAILURE
} from './ActionTypes'
import * as movieApi from '../api/MovieApi'

export const favoriteMovieSuccess = (json) => ({
    type: FAVORITE_MOVIE_SUCCESS,
    payload: {
        favoriteMovies: json.favoriteMovies
    }
})

export const favoriteMovieFailure = (err) => ({
    type: FAVORITE_MOVIE_FAILURE,
    payload: {
        err
    }
})

export const unfavoriteMovieSuccess = (json) => ({
    type: UNFAVORITE_MOVIE_SUCCESS,
    payload: {
        favoriteMovies: json.favoriteMovies
    }
})

export const unfavoriteMovieFailure = (err) => ({
    type: UNFAVORITE_MOVIE_FAILURE,
    payload: {
        err
    }
})

export const editOpinionSuccess = (json) => ({
    type: EDIT_OPINION_SUCCESS,
    payload: {
        favoriteMovies: json.favoriteMovies
    }
})

export const editOpinionFailure = (err) => ({
    type: EDIT_OPINION_FAILURE,
    payload: {
        err
    }
})

export const favoriteMovie = (userId, id, title, description, imageUrl) => {
    return (dispatch) => {
        return movieApi.favoriteMovie(userId, id, title, description, imageUrl)
            .then(json => dispatch(favoriteMovieSuccess(json)))
            .catch(err => dispatch(favoriteMovieFailure(err)))
    }
}

export const unfavoriteMovie = (userId, id) => {
    return (dispatch) => {
        return movieApi.unfavoriteMovie(userId, id)
            .then(json => dispatch(unfavoriteMovieSuccess(json)))
            .catch(err => dispatch(unfavoriteMovieFailure(err)))
    }
}

export const editOpinion = (userId, id, opinion) => {
    return (dispatch) => {
        return movieApi.editOpinion(userId, id, opinion)
            .then(json => dispatch(editOpinionSuccess(json)))
            .catch(err => dispatch(editOpinionFailure(err)))
    }
}