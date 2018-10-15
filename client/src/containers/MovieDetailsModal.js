import React, { Component } from 'react'

class MovieDetailsModal extends Component {


    render() {
        const { onClose } = this.props
        
        return (
            <div className='event-details-modal'>
                <a href="#" class="close" onClick={onClose}/>
                <div>
                    <h2>Modal</h2>
                    <p>lakjsd;lfkaj;sdlfkja;lksjdfkljasdkfj
                        al;skjdf;lkajsd;lkfja;lksdjf;lkajs;dlkfj
                    </p>
                </div>
            </div>
        )
    }

}

export default MovieDetailsModal