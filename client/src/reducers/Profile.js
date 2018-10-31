import {
    FETCH_PROFILE_BEGIN,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE
} from '../actions/ActionTypes'

export const profile = (state = {
    isLoading: false,
    err: null,
    name: null,
    movies: []
}, action) => {
    switch (action.type) {
        case FETCH_PROFILE_BEGIN:
            return {
                ...state,
                isLoading: true,
                err: null
            }
        case FETCH_PROFILE_SUCCESS:
            return {
                isLoading: false,
                err: null,
                name: action.payload.name,
                movies: createUserFavMovieObjs(action.payload.movies).slice(0).reverse()
            }
        case FETCH_PROFILE_FAILURE:
            return {
                isLoading: false,
                err: action.payload.err,
                name: null,
                movies: []
            }
        default: 
            return state
    }
}

const createUserFavMovieObjs = (movies) => {
    return movies.map(favoriteMovie => (
        {
            ...favoriteMovie.movie,
            id: favoriteMovie.movie.movieId,
            imageUrl: favoriteMovie.movie.image_url,
            favoritedBy: favoriteMovie.user.name
        }
    ))
}




