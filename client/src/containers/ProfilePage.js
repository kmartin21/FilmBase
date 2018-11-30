import React, { Component } from 'react'
import MoviesTable from './MoviesTable' 
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchProfile } from '../actions/Profile'
import auth0Client from '../containers/oauth/Auth'

class ProfilePage extends Component {

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
        const imageUrl = auth0Client.profile.picture
        debugger
        
        return (
            <div>
                <div className="profile__user-info-container">
                    
                    <h3>{this.props.name}</h3>
                </div>
                <MoviesTable isProfile={true} isActiveUserProfile={isActiveUserProfile} />
            </div>
        )    
    }
}

const mapStateToProps = (state) => (
    {
        userId: state.loggedInUserInfo.id,
        name: state.profile.name ? state.profile.name : ''
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        fetchProfile: (id) => dispatch(fetchProfile(id))
    }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage))