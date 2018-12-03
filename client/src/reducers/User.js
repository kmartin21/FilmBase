import {
    SET_LOGGED_IN_USER_INFO,
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
    imageUrl: null,
    favoriteMovies: []
}, action) => {
    switch (action.type) {
        case SET_LOGGED_IN_USER_INFO:
            return {
                id: action.payload.id,
                name: action.payload.name,
                imageUrl: action.payload.imageUrl,
                favoriteMovies: createLoggedInUserFavMovieObjs(action.payload.favoriteMovies)
            }
        case FAVORITE_MOVIE_SUCCESS:
        case UNFAVORITE_MOVIE_SUCCESS:
        case EDIT_OPINION_SUCCESS:
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




