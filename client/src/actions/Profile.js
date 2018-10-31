import {
    FETCH_PROFILE_BEGIN,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE
} from './ActionTypes'
import * as profileApi from '../api/ProfileApi'

export const fetchProfileBegin = () => ({
    type: FETCH_PROFILE_BEGIN
})

export const fetchProfileSuccess = (json) => ({
    type: FETCH_PROFILE_SUCCESS,
    payload: {
        name: json.user.name,
        movies: json.favoriteMovies
    }
})

export const fetchProfileFailure = (err) => ({
    type: FETCH_PROFILE_FAILURE,
    payload: {
        err: err
    }
})

export const fetchProfile = (id) => {
    return (dispatch) => {
        dispatch(fetchProfileBegin())
        
        return profileApi.getProfile(id)
            .then(json => dispatch(fetchProfileSuccess(json)))
            .catch(err => dispatch(fetchProfileFailure(err)))
    }
}