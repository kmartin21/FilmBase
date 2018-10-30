import React, { Component } from 'react'
import MoviesTable from '../containers/MoviesTable' 
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchProfile } from '../actions/Profile'

class ProfilePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            favoriteMovies: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            console.log(this.props.match.params.id)
            this.props.fetchProfile(this.props.match.params.id)
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        this.props.fetchProfile(this.props.match.params.id)
    }

    render() {
        const isActiveUserProfile = (this.props.userId !== null && this.props.userId)

        return (
            <div>
                <h3>{this.state.user.name}</h3>
                <MoviesTable isProfile={true} isActiveProfile={isActiveUserProfile} />
            </div>
        )    
    }
}

const mapStateToProps = (state) => (
    {
        userId: state.loggedInUserInfo.id
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        fetchProfile: (id) => dispatch(fetchProfile(id))
    }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage))