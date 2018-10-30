import fetch from 'cross-fetch'

export const getProfile = (id) => {
    console.log(`${process.env.REACT_APP_API_BASE_URL}user/${id}/profile`)
    return fetch(`${process.env.REACT_APP_API_BASE_URL}user/${id}/profile`, {
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



