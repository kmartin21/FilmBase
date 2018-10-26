import {
    FETCH_PROFILE_BEGIN,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE
} from './ActionTypes'

export const fetchProfileBegin = () => ({
    type: FETCH_PROFILE_BEGIN
})

export const fetchProfileSuccess = () => ({
    type: FETCH_PROFILE_SUCCESS
})

export const fetchProfileFailure = () => ({
    type: FETCH_PROFILE_FAILURE,
    payload: {
        
    }
})