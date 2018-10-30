import {
    SET_LOGGED_IN_USER_ID,
    SET_LOGGED_IN_USER_FAV_MOVIES,
    LOGOUT_USER
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
        case SET_LOGGED_IN_USER_FAV_MOVIES:
            return {
                ...state,
                favoriteMovies: action.payload.favoriteMovies
            }
        case LOGOUT_USER: 
            return {
                id: null,
                favoriteMovies: []
            }
        default:
            return state
    }
}




