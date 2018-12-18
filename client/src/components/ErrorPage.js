import React from 'react'
import PropTypes from 'prop-types'

const ErrorPage = ({ errorMessage }) => (
    <div className="error-message">
        <h2>{errorMessage}</h2>
    </div>
)

ErrorPage.PropTypes = {
    errorMessage: PropTypes.string.isRequired
}

export default ErrorPage