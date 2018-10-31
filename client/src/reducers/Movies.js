import {
    FETCH_SEARCHED_MOVIES_BEGIN,
    FETCH_SEARCHED_MOVIES_SUCCESS,
    FETCH_SEARCHED_MOVIES_FAILURE,
    FETCH_RECENT_FAV_MOVIES_BEGIN,
    FETCH_RECENT_FAV_MOVIES_SUCCESS,
    FETCH_RECENT_FAV_MOVIES_FAILURE,
    CLEAR_SEARCHED_MOVIES
} from '../actions/ActionTypes'

export const searchedMovies = (state = {
    isLoading: false,
    err: null,
    fromSearch: false,
    movies: []
}, action) => {
    switch (action.type) {
        case FETCH_SEARCHED_MOVIES_BEGIN:
            return {
                ...state,
                isLoading: true,
                err: null,
                fromSearch: true
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
        case CLEAR_SEARCHED_MOVIES:
            return {
                isLoading: false,
                err: null,
                fromSearch: true,
                movies: []
            }
        default:
            return state
    }
}

export const recentFavMovies = (state = {
    isLoading: false,
    err: null,
    fromSearch: false,
    movies: []
}, action) => {
    switch (action.type) {
        case FETCH_RECENT_FAV_MOVIES_BEGIN:
            return {
                ...state,
                isLoading: true,
                fromSearch: false,
                err: null
            }
        case FETCH_RECENT_FAV_MOVIES_SUCCESS:
            return {
                isLoading: false,
                err: null,
                fromSearch: false,
                movies: createRecentFavMoviesObjs(action.payload.movies).slice(0).reverse()
            }
        case FETCH_RECENT_FAV_MOVIES_FAILURE:
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
    return movies.map(movie => (
        {
            id: movie.id,
            title: movie.title,
            imageUrl: movie.poster_path,
            description: movie.overview
        }
    ))
}

const createRecentFavMoviesObjs = (movies) => {
    return movies.map(recentFavMovie => (
        {
            id: recentFavMovie.movie.movieId,
            title: recentFavMovie.movie.title,
            imageUrl: recentFavMovie.movie.image_url,
            description: recentFavMovie.movie.description,
            favoritedBy: recentFavMovie.user.name,
            user_id: recentFavMovie.user._id,  
            opinion: recentFavMovie.movie.opinion
        }
    ))
}
