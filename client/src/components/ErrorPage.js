import React from 'react'

const ErrorPage = ({ errorMessage }) => (
    <div className="error-message">
        <h2>{errorMessage}</h2>
    </div>
)

export default ErrorPage