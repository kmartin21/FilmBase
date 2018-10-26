import fetch from 'cross-fetch'

export const searchMovies = (query) => {
    return fetch(`${process.env.MOVIE_DB_API_BASE_URL}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
           .then(handleNetworkErrors)
           .then(response => response.json())
           .catch(err => err)
}

export const getRecentFavMovies = () => {
    return fetch(`${process.env.API_BASE_URL}recent-favorites`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(handleNetworkErrors)
            .then(response => response.json())
            .catch(err => err)
}

const handleNetworkErrors = (response) => {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response
}
