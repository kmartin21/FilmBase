import fetch from 'cross-fetch'

export const searchMovies = (query) => {
    return fetch(`${process.env.REACT_APP_MOVIE_DB_API_BASE_URL}search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
           .then(handleNetworkErrors)
           .then(response => response.json())
           .catch(err => {
               throw err
           })
}

export const getRecentFavMovies = () => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}recent-favorites`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(handleNetworkErrors)
            .then(response => response.json())
            .catch(err => {
                throw err
            })
}

const handleNetworkErrors = (response) => {
    if (!response.ok) {
        throw new Error(response.status)
    }
    return response
}
