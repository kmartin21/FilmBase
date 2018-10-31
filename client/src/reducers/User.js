import {
    SET_LOGGED_IN_USER_ID,
    SET_LOGGED_IN_USER_FAV_MOVIES,
    LOGOUT_USER,
    FAVORITE_MOVIE_SUCCESS,
    FAVORITE_MOVIE_FAILURE,
    UNFAVORITE_MOVIE_SUCCESS,
    UNFAVORITE_MOVIE_FAILURE,
    EDIT_OPINION_SUCCESS,
    EDIT_OPINION_FAILURE
} from '../actions/ActionTypes'

export const loggedInUserInfo = (state = {
    id: null,
    favoriteMovies: []
}, action) => {
    switch (action.type) {
        case SET_LOGGED_IN_USER_ID:
            return {
                ...state,
                id: action.payload.id
            }
        case FAVORITE_MOVIE_SUCCESS:
        case UNFAVORITE_MOVIE_SUCCESS:
        case EDIT_OPINION_SUCCESS:
        case SET_LOGGED_IN_USER_FAV_MOVIES:
            return {
                ...state,
                favoriteMovies: createLoggedInUserFavMovieObjs(action.payload.favoriteMovies)
            }
        case LOGOUT_USER: 
            return {
                id: null,
                favoriteMovies: []
            }
        case FAVORITE_MOVIE_FAILURE:
        case UNFAVORITE_MOVIE_FAILURE:
        case EDIT_OPINION_FAILURE:
        default:
            return state
    }
}

const createLoggedInUserFavMovieObjs = (favMovies) => {
    return favMovies.map(favMovie => ({
        id: favMovie.movieId,
        opinion: favMovie.opinion
    }))
}




