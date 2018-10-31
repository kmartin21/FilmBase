import fetch from 'cross-fetch'
import auth0Client from '../containers/oauth/Auth'

export const favoriteMovie = (userId, id, title, description, imageUrl) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}user/${userId}/fav-movie/${id}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth0Client.getIdToken()}`
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    imageUrl: imageUrl
                })
            })
            .then(handleNetworkErrors)
            .then(response => response.json())
            .catch(err => err)
}

export const unfavoriteMovie = (userId, id) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}user/${userId}/fav-movie/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth0Client.getIdToken()}`
                }
            })
            .then(handleNetworkErrors)
            .then(response => response.json())
            .catch(err => err)
}

export const editOpinion = (userId, id, opinion) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}user/${userId}/fav-movie/${id}/opinion`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth0Client.getIdToken()}`
                },
                body: JSON.stringify({
                    opinion: opinion
                })
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