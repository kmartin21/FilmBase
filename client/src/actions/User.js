import {
    SET_LOGGED_IN_USER_ID,
    SET_LOGGED_IN_USER_FAV_MOVIES
} from './ActionTypes'

export const setLoggedInUserId = (id) => ({
    type: SET_LOGGED_IN_USER_ID,
    payLoad: {
        id
    }
})

export const setLoggedInUserFavMovies = (favoriteMovies) => ({
    type: SET_LOGGED_IN_USER_FAV_MOVIES,
    payLoad: {
        favoriteMovies
    }
})