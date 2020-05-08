import React from 'react';
import Aux from '../../../hoc/Aux'
import './OrderSummary.css'


const orderSummary= (props) => {

 const items= Object.keys(props.ingredients).map((igKey) => {
 return (<li><span className = "Item">{igKey}</span> : {props.ingredients[igKey]}</li>);
 })

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
             {items}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    )
        
}

export default orderSummary;