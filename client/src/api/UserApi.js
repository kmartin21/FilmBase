import fetch from 'cross-fetch'
import auth0Client from '../oauth/Auth'

export const loginUser = () => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}login`, {
                method: 'post',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: `${auth0Client.getProfile().name}`, username: `${auth0Client.getProfile().nickname}`})
            })
            .then(handleNetworkErrors)
            .then(res => res.json())
            .catch(err => err)
}

const handleNetworkErrors = (response) => {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response
}