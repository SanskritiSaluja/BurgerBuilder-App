import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import './OrderSummary.css'
import Button from './../../UI/Button/Button'


const  OrderSummary = props => {
    const items= Object.keys(props.ingredients).map((igKey) => {
        return (<li key = {igKey + props.ingredients[igKey]}><span className = "Item">{igKey}</span> : {props.ingredients[igKey]}</li>);
        })
       
       
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
             {items}
             </ul>
           <p><strong>Total Price: {props.totalPrice.toFixed(2)} </strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked= {props.purchaseCancelled}>CANCEL</Button>
            <Button btnType ="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
 }
        
export default OrderSummary;