import React, { Component } from 'react'
import MoviesTable from './MoviesTable' 
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchProfile } from '../actions/Profile'

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
        
        return (
            <div>
                <h3>{this.props.name}</h3>
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