import React from 'react'
import ReactDOM from 'react-dom'

class Modal extends React.Component {
    constructor(props) {
      super(props);
     
      this.modalDiv = document.createElement('div');
      this.modalRoot = document.getElementById('modal-root')
    }
  
    componentDidMount() {
      this.modalRoot.appendChild(this.modalDiv);
    }
  
    componentWillUnmount() {
      this.modalRoot.removeChild(this.modalDiv);
    }
    
    render() {
      return ReactDOM.createPortal(
        this.props.children,
        this.modalDiv
      );
    }
  }

  export default Modal