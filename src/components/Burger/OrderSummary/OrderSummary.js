
import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux'
import './OrderSummary.css'
import Button from './../../UI/Button/Button'


class  OrderSummary extends Component {
  componentWillUpdate() {
      console.log("update")
  }

render (){
    const items= Object.keys(this.props.ingredients).map((igKey) => {
        return (<li key = {igKey + this.props.ingredients[igKey]}><span className = "Item">{igKey}</span> : {this.props.ingredients[igKey]}</li>);
        })
       
       
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
             {items}
             </ul>
           <p><strong>Total Price: {this.props.totalPrice.toFixed(2)} </strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked= {this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType ="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
 }
        
}

export default OrderSummary;