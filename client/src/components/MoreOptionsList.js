import React, { Component } from 'react'

class MoreOptionsList extends Component {

    constructor(props) {
        super(props)

        this.listRef = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    
    handleClickOutside(event) {
        if (this.listRef.current && !this.listRef.current.contains(event.target) && event.target.className !== "nav__more-options-btn") {
            this.props.onClickOutside()
        }
    }

    render = () => (
        <ul ref={this.listRef} className="nav__more-options-list">
            <li className="nav__more-options-list-item" onClick={this.props.signOut}>Sign out</li>
        </ul>
    )
}

export default MoreOptionsList
