import React, { Component } from 'react';
import './Modal.css';
import Aux from '../../../hoc/Aux/Aux'
import BackDrop from '../BackDrop/BackDrop'  

class Modal extends Component {
    
    shouldComponentUpdate(nextProps , nextState) {
        return  this.props.show !== nextProps.show
    }

    componentWillUpdate () {
        console.log("Modal update");
    }
    
    render() {
        return(
    <Aux>
        <BackDrop show= {this.props.show} clicked = {this.props.cancel}/>
    <div className= "Modal"
         style = {{
             transform : this.props.show ? 'translateY(0)'  : 'translateY(-100vh)',
             opacity : this.props.show ? '1' : '0'
         }}
     >
        {this.props.children}
    </div>
    </Aux>
);
}
}

export default Modal;