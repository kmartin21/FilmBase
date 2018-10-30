import {
    SET_LOGGED_IN_USER_ID,
    SET_LOGGED_IN_USER_FAV_MOVIES,
    LOGOUT_USER
} from './ActionTypes'

export const setLoggedInUserId = (id) => ({
    type: SET_LOGGED_IN_USER_ID,
    payload: {
        id
    }
})

export const setLoggedInUserFavMovies = (favoriteMovies) => ({
    type: SET_LOGGED_IN_USER_FAV_MOVIES,
    payload: {
        favoriteMovies
    }
})

export const logoutUser = () => ({
    type: LOGOUT_USER
})