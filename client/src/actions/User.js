import {
    SET_LOGGED_IN_USER_INFO,
    LOGOUT_USER
} from './ActionTypes'

export const setLoggedInUserInfo = (json) => ({
    type: SET_LOGGED_IN_USER_INFO,
    payload: {
        id: json.userId,
        name: json.name,
        imageUrl: json.imageUrl,
        favoriteMovies: json.favoriteMovies
    }
})

export const logoutUser = () => ({
    type: LOGOUT_USER
})