import React, { Component } from 'react'
import MoviesTable from './MoviesTable' 
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchProfile } from '../actions/Profile'
import ErrorPage from '../components/ErrorPage'
import PropTypes from 'prop-types'

class ProfilePage extends Component {
    static propTypes = {
        userId: PropTypes.string,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        err: PropTypes.object,
        fetchProfile: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchProfile(this.props.match.params.id)
        }
    }

    componentDidMount() {
        this.props.fetchProfile(this.props.match.params.id)
    }

    render() {
        const isActiveUserProfile = (this.props.userId !== null && this.props.userId === this.props.match.params.id)
        const imageUrl = this.props.imageUrl
        var errorPage = null
        
        if (this.props.err) {
            switch(parseInt(this.props.err.message, 10)) {
                case 404:
                    errorPage = <ErrorPage errorMessage="404. Looks like you're a bit lost, this user hasn't been found."/>
                    break
                case 500:
                    errorPage = <ErrorPage errorMessage="500. Oops, something went wrong on our end. We're working to fix this."/>
                    break
                default: 
                    errorPage = <ErrorPage errorMessage="500. Oops, something went wrong on our end. We're working to fix this."/>
                    break
            }
        }

        return (
            <div>
                {React.isValidElement(errorPage) ? 
                    errorPage
                    :
                    <div>
                        <div className="profile__user-info-container">
                            <img className="profile__user-image" src={imageUrl} alt='Profile'/>
                            <h2 className="profile__user-name">{this.props.name}</h2>
                        </div>
                        <MoviesTable isProfile={true} isActiveUserProfile={isActiveUserProfile} />
                    </div>
                }
            </div>
        )    
    }
}

const mapStateToProps = (state) => (
    {
        userId: state.loggedInUserInfo.id,
        name: state.profile.name ? state.profile.name : '',
        imageUrl: state.profile.imageUrl ? state.profile.imageUrl : '',
        err: state.profile.err ? state.profile.err : null
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        fetchProfile: (id) => dispatch(fetchProfile(id))
    }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage))