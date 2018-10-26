import {
    FETCH_SEARCHED_MOVIES_BEGIN,
    FETCH_SEARCHED_MOVIES_SUCCESS,
    FETCH_SEARCHED_MOVIES_FAILURE,
    FETCH_RECENT_FAV_MOVIES_BEGIN,
    FETCH_RECENT_FAV_MOVIES_SUCCESS,
    FETCH_RECENT_FAV_MOVIES_FAILURE
} from './ActionTypes'

export const searchedMovies = (state = {}, action) => {
    switch (action.type) {
        case FETCH_SEARCHED_MOVIES_BEGIN:
            return {
                ...state,
                isLoading: true,
                err: null
            }
        case FETCH_SEARCHED_MOVIES_SUCCESS:
            return {
                isLoading: false,
                err: null,
                fromSearch: true,
                movies: createSearchedMovieObjs(action.payload.movies)
            }
        case FETCH_SEARCHED_MOVIES_FAILURE:
            return {
                ...state,
                isLoading: false,
                err: action.payload.err
            }
        default:
            return state
    }
}

const createSearchedMovieObjs = (movies) => {
    return searchedMovieObjs = movies.map(movie => (
        {
            id: movie.id,
            title: movie.title,
            imageUrl: movie.poster_path,
            description: movie.description
        }
    ))
}